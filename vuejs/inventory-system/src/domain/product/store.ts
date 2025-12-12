import { ref, computed } from 'vue';
import { type Product, type NewProduct } from '@/domain/product/model/product';

let nextId = 4;


const products = ref<Product[]>([
    {id: 0, price: 1.00, amount: 0, minimumAmount: 5, name: "Brood"},
	{id: 1, price: 0.99, amount: 0, minimumAmount: 5, name: "Broccoli"},
	{id: 2, price: 1.20, amount: 0, minimumAmount: 5, name: "Krentebollen"},
	{id: 3, price: 2.99, amount: 0, minimumAmount: 5, name: "Noten"},
    {id: 4, price: 0.99, amount: 0, minimumAmount: 5, name: "Extra-extra-cheesy-double-bacon-burger"},
	{id: 5, price: 1.20, amount: 0, minimumAmount: 5, name: "Chocoladehazelnootpasta"},
	{id: 6, price: 2.99, amount: 0, minimumAmount: 5, name: "Helemaal-gegrilde BBQ-kippendijfilet"}
]);

export const addProduct = (newProduct : NewProduct) : void => {
    const product = {id: nextId++, ...newProduct}
    products.value.push(product);
}

export const getProduct = (id : number) : Product | undefined => {
    return products.value.find(product => product.id === id);
}

export const getProducts = computed(() => {
    return products.value;
})

export const getLowProducts = computed(() => {
    return products.value.filter(product => product.amount < product.minimumAmount);
})

export const updateProduct = (product : Product) : void => {
    const index = products.value.findIndex(item => item.id == product.id);
    if (index == -1) {
        throw new Error("Product with id " + product.id + " does not exist!");
    }
    products.value.splice(index, 1, product);
}

export const deleteProduct = (id : number) : Product | undefined => {
    const index = products.value.findIndex(item => item.id == id);
    if (index == -1) {
        return undefined;
    }
    return products.value.splice(index, 1)[0];
}