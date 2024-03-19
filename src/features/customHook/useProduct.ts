import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { publicRequest } from '../../requestMethods';
import { type InterProduct } from '../../types/InterfaceProduct';

const useProduct = (): InterProduct | null => {
    const [product, setProduct] = useState<InterProduct | null>(null);

    const location = useLocation();
    const id = location.pathname.split('/')[2];

    useEffect(() => {
        const getProducts = async (): Promise<void> => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`);
                setProduct(res.data as InterProduct);
            } catch (err) {
                console.log(err);
            }
        };
        void getProducts();
    }, [id]);

    return product;
};

export default useProduct;
