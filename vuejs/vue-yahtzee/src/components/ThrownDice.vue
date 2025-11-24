<script setup>
const diceAmount = 5;
const diceSides = 6;

const dice = defineModel();

const rollDice = () => {
    const result = [];

    for (let i = 0; i < diceAmount; i++) {
        const value = Math.floor(Math.random() * diceSides) + 1;
        result[i] = value;
    }

    dice.value = result;
};
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ dice[0] ?? '-' }}</td>
                <td>{{ dice[1] ?? '-' }}</td>
                <td>{{ dice[2] ?? '-' }}</td>
                <td>{{ dice[3] ?? '-' }}</td>
                <td>{{ dice[4] ?? '-' }}</td>
            </tr>
        </tbody>
    </table>
    <br />
    <button @click="rollDice">Gooien!</button>
    <br />
</template>

<style scoped></style>
