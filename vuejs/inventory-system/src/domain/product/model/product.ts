export interface Product {
    id: number;
    name: string;
    amount: number;
    minimumAmount: number;
    price: number;
}

export type NewProduct = Omit<Product, "id">;
