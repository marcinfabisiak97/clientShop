import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Container, Wraper } from '../../components/ui/productsStyles';
import { publicRequest } from '../../requestMethods';
import { type InterProduct } from '../../types/InterfaceProduct';
import Product from './Product';

type Filters = Record<string, string>;

const Products: React.FC<{
    cat?: string;
    filters?: Filters;
    sort?: string;
}> = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState<InterProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<InterProduct[]>(
        [],
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async (): Promise<void> => {
            try {
                const res = await publicRequest.get(
                    cat !== undefined && cat !== ''
                        ? `/products?category=${cat}`
                        : '/products',
                );

                setProducts(res.data as InterProduct[]);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        void getProducts();
    }, [cat]);
    useEffect(() => {
        const getFilters = async (): Promise<void> => {
            if (filters?.color === 'all')
                setFilteredProducts(
                    filters.color === 'all'
                        ? products
                        : products.filter(
                              (item) => item.color[0] === filters.color,
                          ),
                );
        };
        void getFilters();
    }, [products, filters?.color, cat]);

    useEffect(() => {
        if (sort === 'newest') {
            setFilteredProducts((prev) =>
                [...prev].sort(
                    (a, b) =>
                        new Date(b.createdAt ?? 0).getTime() -
                        new Date(a.createdAt ?? 0).getTime(),
                ),
            );
        } else if (sort === 'asc') {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price),
            );
        } else if (sort === 'desc') {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price),
            );
        }
    }, [sort, products]);
    return (
        <Container>
            {loading ? (
                <Wraper>
                    <SkeletonTheme baseColor="#f5fbfd" highlightColor="#037878">
                        <Skeleton circle height={200} width={200} />
                    </SkeletonTheme>
                </Wraper>
            ) : (
                filteredProducts.map((product, index) => (
                    <Product product={product} key={index} />
                ))
            )}
        </Container>
    );
};

export default Products;
