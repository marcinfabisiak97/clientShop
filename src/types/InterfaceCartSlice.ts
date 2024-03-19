import { type InterProduct } from '../types/InterfaceProduct';

export interface InterCartSlice {
    products: InterProduct[];
    quantity: number;
    total: number;
}
