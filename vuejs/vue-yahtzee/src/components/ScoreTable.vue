<script setup>
import {computed} from 'vue';

const yahtzeeScore = 50;
const smallStraightScore = 30;
const largeStraightScore = 40;
const fullHouseScore = 25;

const dice = defineModel();

const countResult = computed(() => {
    let result = []; // length 7, 0-6 note 0 is not used

    for (let i = 0; i < dice.value.length; i++) {
        const value = dice.value[i];
        const count = result[value];

        if (count == null) {
            result[value] = 1;
        } else {
            result[value] = count + 1;
        }
    }

    return result;
});

const scoreCount = (value, countResult) => {
	const count = countResult[value];

	if (count == null) {
		return 0;
	}

	return count * value;
}

const scoreXOfAKind = (amount, countResult, score) => {
    let result = 0;

    for (let i = 1; i < countResult.length; i++) {
        let count = countResult[i];

        if (count == null) {
            continue;
        }

        if (count >= amount) {
            result = score;
            break;
        }
    }

    return result;
};

const hasStraight = (length, countResult) => {
    let highestLength = 0;
    let currentLength = 0;

    for (let i = 1; i < countResult.length; i++) {
        let count = countResult[i];

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

const aces = computed(() => scoreCount(1, countResult.value) ?? 0);
const twos = computed(() => scoreCount(2, countResult.value) ?? 0);
const threes = computed(() => scoreCount(3, countResult.value) ?? 0);
const fours = computed(() => scoreCount(4, countResult.value) ?? 0);
const fives = computed(() => scoreCount(5, countResult.value) ?? 0);
const sixes = computed(() => scoreCount(6, countResult.value) ?? 0);

const chance = computed(() => {
    if (dice.value.length == 0) {
        return null;
    }

    return dice.value.reduce((accumulator, currentValue) => accumulator + currentValue);
});
const threeOfAKind = computed(() => scoreXOfAKind(3, countResult.value, chance.value));
const fourOfAKind = computed(() => scoreXOfAKind(4, countResult.value, chance.value));
const fullHouse = computed(() => {
    let hasThree = false;
    let hasTwo = false;
    for (let i = 1; i < countResult.value.length; i++) {
        let count = countResult.value[i];

        if (count === 3) {
            hasThree = true;
        } else if (count === 2) {
            hasTwo = true;
        }
    }
    return hasThree && hasTwo ? fullHouseScore : 0;
});
const smallStraight = computed(() => (hasStraight(4, countResult.value) ? smallStraightScore : 0));
const largeStraight = computed(() => (hasStraight(5, countResult.value) ? largeStraightScore : 0));

const yahtzee = computed(() => scoreXOfAKind(5, countResult.value, yahtzeeScore));
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
            <tr>
                <td>Enen</td>
                <td>{{ aces ?? '-' }}</td>
            </tr>
            <tr>
                <td>Tweeën</td>
                <td>{{ twos ?? '-' }}</td>
            </tr>
            <tr>
                <td>Drieën</td>
                <td>{{ threes ?? '-' }}</td>
            </tr>
            <tr>
                <td>Vieren</td>
                <td>{{ fours ?? '-' }}</td>
            </tr>
            <tr>
                <td>Vijven</td>
                <td>{{ fives ?? '-' }}</td>
            </tr>
            <tr>
                <td>Zessen</td>
                <td>{{ sixes ?? '-' }}</td>
            </tr>
            <tr>
                <td colspan="2"></td>
            </tr>
            <tr>
                <td>Chance</td>
                <td>{{ chance ?? '-' }}</td>
            </tr>
            <tr>
                <td>Three of a kind</td>
                <td>{{ threeOfAKind ?? '-' }}</td>
            </tr>
            <tr>
                <td>Four of a kind</td>
                <td>{{ fourOfAKind ?? '-' }}</td>
            </tr>
            <tr>
                <td>Full House</td>
                <td>{{ fullHouse ?? '-' }}</td>
            </tr>
            <tr>
                <td>Small Straight</td>
                <td>{{ smallStraight ?? '-' }}</td>
            </tr>
            <tr>
                <td>Large Straight</td>
                <td>{{ largeStraight ?? '-' }}</td>
            </tr>
            <tr>
                <td>Yahtzee</td>
                <td>{{ yahtzee ?? '-' }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>
