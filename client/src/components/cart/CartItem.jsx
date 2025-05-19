import * as actionTypes from '../../redux/constants/cartConstant';
import { Card, Box, Typography, Button, styled } from '@mui/material';
import GroupButton from './GroupedButton';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cartAction';

const Component = styled(Card)`
    border-top: 1px solid #f0f0f0;
    border-radius: 0px;
    display: flex;
    padding: 16px;
`;

const LeftComponent = styled(Box)`
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Cost = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const MRP = styled(Typography)`
    color: #878787;
`;

const Discount = styled(Typography)`
    color: #388E3C;
`;

const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
    color: #2874f0;
    font-weight: 600;
    text-transform: none;
`;

const Title = styled(Typography)`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
`;

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(item.id, item.stateName));
    };

    return (
        <Component>
            <LeftComponent>
                <img
                    src={item.url || 'https://via.placeholder.com/110'}
                    alt="product"
                    style={{ height: 110, width: 110 }}
                />
                <GroupButton quantity={item.quantity} />
            </LeftComponent>
            <Box style={{ margin: 20, flex: 1 }}>
                <Title>{item.title?.shortTitle || 'Unnamed Product'}</Title>

                <SmallText>
                    Seller: RetailNet
                    {/* <span>
                        <img
                            src={fassured}
                            alt="fassured"
                            style={{ width: 50, marginLeft: 10 }}
                        />
                    </span> */}
                </SmallText>

                <Typography style={{ margin: '20px 0' }}>
                    <Cost component="span">₹{item.price?.cost ?? 'N/A'}</Cost>&nbsp;&nbsp;&nbsp;
                    <MRP component="span">
                        <strike>₹{item.price?.mrp ?? 'N/A'}</strike>
                    </MRP>&nbsp;&nbsp;&nbsp;
                    <Discount component="span">{item.price?.discount ?? 'N/A'} off</Discount>
                </Typography>

                <Remove onClick={handleRemoveFromCart}>Remove</Remove>
            </Box>
        </Component>
    );
};

export default CartItem;
