import { DeleteOutline } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react';

import {
    ButtonWrapper,
    Details,
    Hr,
    Image,
    Information,
    PriceDetail,
    Product,
    ProductAmount,
    ProductAmountContainer,
    ProductColor,
    ProductDetail,
    ProductId,
    ProductName,
    ProductPrice,
} from '../../components/ui/cartStyles';
import {
    addProduct,
    decreseProduct,
    removeProduct,
} from '../../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const CartInformation = (): React.ReactNode => {
    const cart = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    return (
        <Information>
            {cart.products.map((product, id) => (
                <Product key={id}>
                    <ProductDetail>
                        <Image src={product.img[0]} />
                        <Details>
                            <ProductName>
                                <b>Product:</b>
                                {product.title}
                            </ProductName>
                            <ProductId>
                                <b>ID:</b>
                                {product._id}
                            </ProductId>
                            {product.color?.map((color, i) => (
                                <ProductColor key={i} color={color} />
                            ))}
                        </Details>
                    </ProductDetail>
                    <PriceDetail>
                        <ProductAmountContainer>
                            {product.quantity === 1 ? (
                                <>
                                    <ButtonWrapper>
                                        <DeleteOutline
                                            onClick={() =>
                                                dispatch(
                                                    removeProduct({
                                                        product,
                                                        quantity: 1,
                                                    }),
                                                )
                                            }
                                        />
                                    </ButtonWrapper>
                                </>
                            ) : (
                                <>
                                    <ButtonWrapper>
                                        <RemoveIcon
                                            onClick={() =>
                                                dispatch(
                                                    decreseProduct({
                                                        product,
                                                        quantity: 1,
                                                    }),
                                                )
                                            }
                                        />
                                    </ButtonWrapper>
                                </>
                            )}
                            <ProductAmount>{product.quantity}</ProductAmount>
                            <>
                                <ButtonWrapper>
                                    <AddIcon
                                        onClick={() =>
                                            dispatch(
                                                addProduct({
                                                    product,
                                                    quantity: 1,
                                                }),
                                            )
                                        }
                                    />
                                </ButtonWrapper>
                            </>
                        </ProductAmountContainer>
                        <ProductPrice>
                            {product.price * product.quantity}PLN
                        </ProductPrice>
                    </PriceDetail>
                </Product>
            ))}
            <Hr />
        </Information>
    );
};

export default CartInformation;
