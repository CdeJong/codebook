export interface Product {
    id: number;
    name: string;
    amount: number;
    minimumAmount: number;
}

// Used in the ProductForm on create, as a UI component should not be creating unique ids
export type NewProduct = Omit<Product, "id">;
