import { computed, ref } from 'vue';

let nextId = 4;

const groceries = ref([
	{id: 0, name: "Brood", 		    price: 1.00, amount: 0},
	{id: 1, name: "Broccoli", 		price: 0.99, amount: 0},
	{id: 2, name: "Krentebollen", 	price: 1.20, amount: 0},
	{id: 3, name: "Noten", 		    price: 2.99, amount: 0}
]);

export const getAllGroceries = computed(() => groceries.value);
export const getGroceryById = (id) => computed(() => groceries.value.find(grocery => grocery.id == id));

export const addGrocery = (grocery) => {
    grocery['id'] = nextId++;
    groceries.value.push(grocery);
}

export const updateGrocery = (grocery) => {
    const id = grocery.id;
    const index = groceries.value.findIndex(item => item.id == id);
    if (index == -1) {
        throw new Error("Grocery with id " + id + " does not exist!");
    }
    groceries.value.splice(index, 1, grocery);
}

export const deleteGrocery = (id) => {
    const index = groceries.value.findIndex(item => item.id == id);
    if (index == -1) {
        return;
    }
    return groceries.value.splice(index, 1)[0];
}