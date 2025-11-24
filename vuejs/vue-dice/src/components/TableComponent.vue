<script setup>
import { ref } from 'vue';

const diceAmount = 8;
const diceSides = 6;

const count = ref([]);

const rollDice = () => {
    const result = [null, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < diceAmount; i++) {
        const value = Math.floor(Math.random() * diceSides) + 1;
        const count = result[value];

        result[value] = count + 1;
    }

    count.value = result;

}
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Getal</th>
                <th>Aantal</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>{{ count[1] ?? '-' }}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>{{ count[2] ?? '-' }}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>{{ count[3] ?? '-' }}</td>
            </tr>
            <tr>
                <td>4</td>
                <td>{{ count[4] ?? '-' }}</td>
            </tr>
            <tr>
                <td>5</td>
                <td>{{ count[5] ?? '-' }}</td>
            </tr>
            <tr>
                <td>6</td>
                <td>{{ count[6] ?? '-' }}</td>
            </tr>
        </tbody>
        
    </table>
    <br />
    <button @click="rollDice">Roll Dice</button>
</template>

<style scoped>
table {
    border-collapse: collapse;
}

th {
    min-width: 100px;
}

th, td {
    border: 1px solid black;
    padding: 5px;
}

button {
    display: block;
    padding: 5px 10px;
    background-color: aqua;
    border: none;
    border-radius: 5px;
}

button:hover {
    color: white;
}
</style>
