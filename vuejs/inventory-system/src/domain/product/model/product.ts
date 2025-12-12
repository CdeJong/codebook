export interface Product {
    id: number;
    name: string;
    amount: number;
    minimumAmount: number;
}

export type NewProduct = Omit<Product, "id">;
