import paytmchecksum from '../paytm/PaytmChecksum.js';
import dotenv from 'dotenv';
import https from 'https';
import formidable from 'formidable';

// Load environment variables
dotenv.config();

// ✅ ADD PAYMENT GATEWAY - Handles payment initialization
export const addPaymentGateway = async (request, response) => {
  try {
    const { amount, email } = request.body;

    const paytmParams = {
      MID: process.env.PAYTM_MID,
      WEBSITE: process.env.PAYTM_WEBSITE,
      CHANNEL_ID: process.env.PAYTM_CHANNEL_ID,
      INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE_ID,
      ORDER_ID: 'ORDER_' + new Date().getTime(), // unique order ID
      CUST_ID: process.env.PAYTM_CUSTOMER_ID,
      TXN_AMOUNT: amount.toString(),
      CALLBACK_URL: 'https://indiculture.onrender.com/callback',
      EMAIL: email,
      MOBILE_NO: '1234567890',
    };

    const paytmCheckSum = await paytmchecksum.generateSignature(
      paytmParams,
      process.env.PAYTM_MERCHANT_KEY
    );

    const params = {
      ...paytmParams,
      CHECKSUMHASH: paytmCheckSum,
    };

    return response.status(200).json(params);
  } catch (error) {
    console.error('❌ Error generating checksum:', error.message);
    response.status(500).json({ message: 'Error initiating payment gateway' });
  }
};

// ✅ PAYMENT RESPONSE HANDLER - Called after Paytm redirects
export const paymentResponse = (request, response) => {
  try {
    const form = new formidable.IncomingForm();

    form.parse(request, (err, fields) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return response.status(500).send('Internal Server Error');
      }

      const paytmCheckSum = fields.CHECKSUMHASH;
      delete fields.CHECKSUMHASH;

      const isVerifySignature = paytmchecksum.verifySignature(
        fields,
        process.env.PAYTM_MERCHANT_KEY,
        paytmCheckSum
      );

      if (!isVerifySignature) {
        console.log('❌ Checksum Mismatched');
        return response.status(400).json({ message: 'Checksum verification failed' });
      }

      const paytmParams = {
        MID: fields.MID,
        ORDERID: fields.ORDERID,
      };

      paytmchecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY).then((checksum) => {
        paytmParams.CHECKSUMHASH = checksum;

        const post_data = JSON.stringify(paytmParams);

        const options = {
          hostname: 'securegw-stage.paytm.in',
          port: 443,
          path: '/order/status',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length,
          },
        };

        let res = '';
        const post_req = https.request(options, (post_res) => {
          post_res.on('data', (chunk) => {
            res += chunk;
          });

          post_res.on('end', () => {
            const result = JSON.parse(res);
            console.log('🔁 Paytm Response:', result);

            if (result.STATUS === 'TXN_SUCCESS') {
              response.redirect('https://indiculture.onrender.com/payment-success');
            } else {
              response.redirect('https://indiculture.onrender.com/payment-failed');
            }
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    });
  } catch (error) {
    console.error('❌ Error processing payment response:', error);
    response.status(500).json({ message: 'Error processing payment response' });
  }
};
