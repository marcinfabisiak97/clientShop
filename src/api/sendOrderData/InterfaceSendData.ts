export interface InterSendData {
    userId?:string;
    products:{
    _id: string;
    quantity: number;
    }[];
    amount:number;
    address: Record<string, string>;
    status:string;
}