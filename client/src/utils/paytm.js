function isDate(val) {
    // Cross-realm compatible Date check
    return Object.prototype.toString.call(val) === '[object Date]';
}

function isObj(val) {
    // Check if value is a non-null object
    return val !== null && typeof val === 'object';
}

function stringifyValue(val) {
    // Convert object to JSON string, but not Date objects
    if (isObj(val) && !isDate(val)) {
        return JSON.stringify(val); // Ensure that objects are serializable
    } else {
        return val;
    }
}

function buildForm({ action, params }) {
    if (!params || typeof params !== 'object') {
        throw new Error('Invalid or missing "params" in buildForm()');
    }

    // Create a new form
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', action);

    // Loop through all parameters and add hidden inputs to the form
    Object.keys(params).forEach(key => {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', key);
        input.setAttribute('value', stringifyValue(params[key]));
        form.appendChild(input);
    });

    return form;
}

export function post(details) {
    try {
        if (!details || !details.action || !details.params) {
            throw new Error('Missing required payment details');
        }

        // Validate required fields before submitting the form
        if (!details.params['ORDER_ID'] || !details.params['TXN_AMOUNT']) {
            throw new Error('Missing required parameters: ORDER_ID or TXN_AMOUNT');
        }

        // Optional: Validate that the ORDER_ID and TXN_AMOUNT are valid (e.g., not empty, or non-zero)
        if (details.params['TXN_AMOUNT'] <= 0) {
            throw new Error('TXN_AMOUNT must be a positive number');
        }

        if (!details.params['ORDER_ID'].match(/^[a-zA-Z0-9_]+$/)) {
            throw new Error('ORDER_ID contains invalid characters');
        }

        // Build the form with payment details
        const form = buildForm(details);

        // Append form to the body and submit
        document.body.appendChild(form);
        form.submit();

        // Clean up by removing the form after submission
        form.remove();

    } catch (error) {
        console.error('Error submitting Paytm form:', error);
        alert(`Payment failed to initiate. Error: ${error.message}`);
    }
}
