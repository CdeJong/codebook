<script setup>
import {computed} from 'vue';

const yahtzeeScore = 50;
const smallStraightScore = 30;
const largeStraightScore = 40;
const fullHouseScore = 25;
const categoryNames = {
    1: "Enen",
    2: "Tweeën",
    3: "Drieën",
    4: "Vieren",
    5: "Vijven",
    6: "Zessen"
} 

const dice = defineModel();

const countResult = computed(() => {
    const result = {
        1: 0, 
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };

    for (let i = 0; i < dice.value.length; i++) {
        const value = dice.value[i];
        const count = result[value];
        result[value] = count + 1;
    }

    return result;
});

const hasXOfAKind = (amount) => {
    let result = false;

    for (const [, count] of Object.entries(countResult.value)) {

        if (count >= amount) {
            result = true;
            break;
        }
    }

    return result;
};

const hasStraight = (length) => {
    let highestLength = 0;
    let currentLength = 0;

    for (const [, count] of Object.entries(countResult.value)) {
        if (count == null || count === 0) {
            currentLength = 0; // reset!
        } else {
            currentLength += 1;
            if (currentLength > highestLength) {
                highestLength = currentLength;
            }
        }
    }
    return highestLength >= length;
};

const chance = computed(() => {
    if (dice.value.length == 0) {
        return 0;
    }

    return dice.value.reduce((accumulator, currentValue) => accumulator + currentValue);
});

const hasFullHouse = () => {
    let hasThree = false;
    let hasTwo = false;
    for (const [, count] of Object.entries(countResult.value)) {
        if (count === 3) {
            hasThree = true;
        } else if (count === 2) {
            hasTwo = true;
        }
    }
    return hasThree && hasTwo;
};

</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Category</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(amount, index) in countResult" :key="index">
                <td>{{ categoryNames[index] }}</td>
                <td>{{ amount * index }}</td>
            </tr>
            <tr>
                <td colspan="2"></td>
            </tr>
            <tr>
                <td>Chance</td>
                <td>{{ chance }}</td>
            </tr>
            <tr>
                <td>Three of a kind</td>
                <td>{{ hasXOfAKind(3) ? chance : 0 }}</td>
            </tr>
            <tr>
                <td>Four of a kind</td>
                <td>{{ hasXOfAKind(4) ? chance : 0 }}</td>
            </tr>
            <tr>
                <td>Full House</td>
                <td>{{ hasFullHouse() ? fullHouseScore : 0 }}</td>
            </tr>
            <tr>
                <td>Small Straight</td>
                <td>{{ hasStraight(4) ? smallStraightScore : 0 }}</td>
            </tr>
            <tr>
                <td>Large Straight</td>
                <td>{{ hasStraight(5) ? largeStraightScore : 0 }}</td>
            </tr>
            <tr>
                <td>Yahtzee</td>
                <td>{{ hasXOfAKind(5) ? yahtzeeScore : 0 }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>
