export interface Order {
    userId: string | undefined;
    products: Array<{ _id: string; quantity: number }>;
    amount: number;
    address: {};
    status: string;
}
