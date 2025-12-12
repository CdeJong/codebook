import { ref, computed } from 'vue';
import { type Product, type NewProduct } from '@/domain/product/model/product';

let nextId = 4;


const products = ref<Product[]>([
    {id: 0, name: "Brood", 		    price: 1.00, amount: 0, minimumAmount: 5},
	{id: 1, name: "Broccoli", 		price: 0.99, amount: 0, minimumAmount: 5},
	{id: 2, name: "Krentebollen", 	price: 1.20, amount: 0, minimumAmount: 5},
	{id: 3, name: "Noten", 		    price: 2.99, amount: 0, minimumAmount: 5},
    {id: 4, name: "Broccoli", 		price: 0.99, amount: 0, minimumAmount: 5},
	{id: 5, name: "Krentebollen", 	price: 1.20, amount: 0, minimumAmount: 5},
	{id: 6, name: "Noten", 		    price: 2.99, amount: 0, minimumAmount: 5}
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

export const updateProduct = (id : number, product : Product) : void => {
    const index = products.value.findIndex(item => item.id == id);
    if (index == -1) {
        throw new Error("Grocery with id " + id + " does not exist!");
    }
    product.id = id; // so we know for sure the product has an id
    products.value.splice(index, 1, product);
}

// deleteProduct(id)
export const deleteProduct = (id : number) : Product | undefined => {
    const index = products.value.findIndex(item => item.id == id);
    if (index == -1) {
        return undefined;
    }
    return products.value.splice(index, 1)[0];
}