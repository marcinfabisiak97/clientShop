export interface Order {
    userId: string | undefined;
    products: { _id: string; quantity: number }[];
    amount: number;
    address: {};
    status: string;
  }