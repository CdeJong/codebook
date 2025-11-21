<script setup>
import {computed, ref} from 'vue';

const people = ref([
    {name: 'Jan', age: 12},
    {name: 'Piet', age: 20},
]);
const newName = ref('');
const newAge = ref(0);

const addPerson = () => {
    const name = newName.value;
    const age = newAge.value;
    if (typeof name !== 'string' || name.trim().length == 0) {
        return;
    }

    const finalAge = parseInt(age);

    if (isNaN(finalAge)) {
        return;
    }

    newName.value = '';
    newAge.value = '';
    people.value.push({name: name, age: age});
};

const children = computed(() => {
    return people.value.filter(person => person.age < 18);
});

const adults = computed(() => {
    return people.value.filter(person => person.age >= 18);
});

// computed caches the value, and will only recalculate if people/children value changes
const totalPeople = computed(() => people.value.length);
const totalChildren = computed(() => children.value.length);
</script>

<template>
    <h3>People</h3>
    <ul>
        <li v-for="(person, index) in people" :key="index">Name: {{ person.name }}, Age: {{ person.age }}</li>
    </ul>

    <h3>Children</h3>
    <ul>
        <li v-for="(person, index) in children" :key="index">Name: {{ person.name }}, Age: {{ person.age }}</li>
    </ul>

    <h3>Adults</h3>
    <ul>
        <li v-for="(person, index) in adults" :key="index">Name: {{ person.name }}, Age: {{ person.age }}</li>
    </ul>

    <p>Total People: {{ totalPeople }}</p>
    <p>Total Children: {{ totalChildren }}</p>


    <input type="text" v-model="newName" />
    <input type="text" v-model.number="newAge" />
    <button @click="addPerson()">Add</button>
</template>

<style scoped></style>
