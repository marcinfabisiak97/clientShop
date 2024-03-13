import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { StyledLink, Wrapper } from '../../components/ui/orderStyles';
import { useAppSelector } from '../../redux/store';
import { userRequest } from '../../requestMethods';
import { type InterOrder } from '../../types/InterfaceOrder';
import { formatCreatedAt } from '../../Utils';

const Orders: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<InterOrder[]>([
        { _id: '', products: [], amount: 0, status: '', createdAt: '' },
    ]);

    const userId = useAppSelector((state) => {
        return state.user.currentUser.others?._id;
    });
    useEffect(() => {
        const getOrderDetails = async (): Promise<void> => {
            try {
                const response = await userRequest.get(`orders/find/${userId}`);
                setOrders(response.data as InterOrder[]);
                setLoading(true);
            } catch (error) {
                console.error(error);
            }
        };
        void getOrderDetails();
    }, []);
    return (
        <Wrapper>
            {loading ? (
                orders.map((order) => (
                    <div key={order._id}>
                        <h3>Numer zamówienia: {order._id}</h3>
                        <p>Kwota: {order.amount}</p>
                        <p>Status: {order.status}</p>
                        <p>Stworzone: {formatCreatedAt(order.createdAt)}</p>
                        {order.products.map((product) => (
                            <div key={product._id}>
                                <p>
                                    Identyfikator przedmiotu:{' '}
                                    {product.productId !== undefined
                                        ? product.productId
                                        : product._id}
                                </p>
                                <p>Ilość: {product.quantity}</p>
                            </div>
                        ))}
                        <hr />
                    </div>
                ))
            ) : (
                <Wrapper>
                    <SkeletonTheme baseColor="#f5fbfd" highlightColor="#037878">
                        <Skeleton circle height={200} width={200} />
                    </SkeletonTheme>
                </Wrapper>
            )}
            <StyledLink to="/">wróć</StyledLink>
        </Wrapper>
    );
};

export default Orders;
