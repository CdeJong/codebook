
// config/constants

const diceAmount = 5;
const diceSides = 6;
const fullHouseScore = 25;
const smallStraightScore = 30;
const largeStraightScore = 40;
const yahtzeeScore = 50

// api/logic

const handleClick = () => {
    let rollResult = rollDices();
    let countResult = countDices(rollResult);

    let resultCells = document.getElementsByClassName("diceResult");

    for (let i = 0; i < resultCells.length; i++) {
        let resultCell = resultCells.item(i);

        if (rollResult.length < i + 1) {
            break; // no more values
        }

        resultCell.innerHTML = rollResult[i];

    }

    let countCellElements = document.getElementsByClassName("countResult");
    let scoreCellElements = document.getElementsByClassName("scoreResult");

    for (let i = 0; i < diceSides; i++) {
        let countCellElement = countCellElements.item(i);
        let scoreCellElement = scoreCellElements.item(i);
        
        let side = i + 1;
        let count = countResult[side];

        if (count == null) {
            countCellElement.innerHTML = 0;
            scoreCellElement.innerHTML = 0;
        } else {
            countCellElement.innerHTML = count;
            scoreCellElement.innerHTML = count * side;
        }
    }

    let totalDots = getTotalDots(rollResult);

    let chanceScoreResultElement = document.getElementById("chanceScoreResult");
    chanceScoreResultElement.innerHTML = totalDots;

    let threeOfAKindResultElement = document.getElementById("threeOfAKindScoreResult");
    threeOfAKindResultElement.innerHTML = scoreXOfAKind(3, countResult, totalDots);

    let fourOfAKindResultElement = document.getElementById("fourOfAKindScoreResult");
    fourOfAKindResultElement.innerHTML = scoreXOfAKind(4, countResult, totalDots);

    let fullHouseResultElement = document.getElementById("fullHouseScoreResult");
    fullHouseResultElement.innerHTML = scoreFullHouse(countResult);

    let smallStraightResultElement = document.getElementById("smallStraightScoreResult");
    smallStraightResultElement.innerHTML = scoreSmallStraight(countResult);

    let largeStraightResultElement = document.getElementById("largeStraightScoreResult");
    largeStraightResultElement.innerHTML = scoreLargeStraight(countResult);

    let yahtzeeResultElement = document.getElementById("yahtzeeScoreResult");
    yahtzeeResultElement.innerHTML = scoreXOfAKind(5, countResult, yahtzeeScore);

}

const countDices = (rollResult) => {
    // fixes some issues with empty slots
    let result = [null, null, null, null, null, null, null]; // length 7, 0-6 note 0 is not used

    for (let i = 0; i < rollResult.length; i++) {
        let value = rollResult[i];
        let count = result[value];

        if (count == null) {
            result[value] = 1;
        } else {
            result[value] = count + 1;
        }
    }

    return result;
}

const rollDices = () => {
    let result = [];

    for (let i = 0; i < diceAmount; i++) {
        result[i] = rollDice();
    }

    return result;
}

const rollDice = () => {
    return Math.floor(Math.random() * diceSides) + 1;
}

// Apparently they are called pips in English, thought they were named "eyes" like how they are named in Dutch
const getTotalDots = (rollResult) => {
    return rollResult.reduce((accumulator, currentValue) => accumulator + currentValue);
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

}

const scoreFullHouse = (countResult) => {
    let hasThree = false;
    let hasTwo = false;

    for (let i = 1; i < countResult.length; i++) {
        let count = countResult[i];

        if (count === 3) {
            hasThree = true;
        } else if (count === 2) {
            hasTwo = true;
        }
    }

    return hasThree && hasTwo ? fullHouseScore : 0;
}

const scoreSmallStraight = (countResult) => {
    return hasStraight(4, countResult) ? smallStraightScore : 0;
}

const scoreLargeStraight = (countResult) => {
    return hasStraight(5, countResult) ? largeStraightScore : 0;
}

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

}

// debug

const assert = (condition, message = null) => {
    if (!condition) {
        throw new Error(message || "Assertion Failed");
    }
}

function arraysEqual(a, b) {
    if (a === b) {
        return true;
    }

    if (a == null || b == null) {
        return false;
    }
    if (a.length !== b.length) {
        return false;
    }

    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

const assertArray = (a, b, message) => {
    if (!arraysEqual(a, b)) {
        throw new Error(message || "Array Assertion Failed");
    }
}

// events

let buttonElement = document.getElementById("rollButton");
buttonElement.addEventListener("click", () => handleClick());

// tests

// TEST 1
let rollResult = [1, 2, 3, 4, 5];

let countResult = countDices(rollResult);
assertArray(countResult, [null, 1, 1, 1, 1, 1, null], "countDices failed #1");
let totalDots = getTotalDots(rollResult);
assert(totalDots == 15, "getTotalDots failed #1");

assert(scoreXOfAKind(3, countResult, totalDots) == 0, "scoreThreeOfAKind failed #1");
assert(scoreXOfAKind(4, countResult, totalDots) == 0, "scoreFourOfAKind failed #1");
assert(scoreFullHouse(countResult) == 0, "scoreFullHouse failed #1");
assert(scoreSmallStraight(countResult) == smallStraightScore, "scoreSmallStraight failed #1");
assert(scoreLargeStraight(countResult) == largeStraightScore, "scoreLargeStraight failed #1");
assert(scoreXOfAKind(5, countResult, yahtzeeScore) == 0, "scoreYahtzee failed #1");


// TEST 2
rollResult = [2, 2, 5, 5, 5];

countResult = countDices(rollResult);
assertArray(countResult, [null, null, 2, null, null, 3, null], "countDices failed #2");
totalDots = getTotalDots(rollResult);
assert(totalDots == 19, "getTotalDots failed #2");

assert(scoreXOfAKind(3, countResult, totalDots) == totalDots, "scoreThreeOfAKind failed #2");
assert(scoreXOfAKind(4, countResult, totalDots) == 0, "scoreFourOfAKind failed #2");
assert(scoreFullHouse(countResult) == fullHouseScore, "scoreFullHouse failed #2");
assert(scoreSmallStraight(countResult) == 0, "scoreSmallStraight failed #2");
assert(scoreLargeStraight(countResult) == 0, "scoreLargeStraight failed #2");
assert(scoreXOfAKind(5, countResult, yahtzeeScore) == 0, "scoreYahtzee failed #2");


// TEST 3
rollResult = [5, 5, 5, 5, 5];

countResult = countDices(rollResult);
assertArray(countResult, [null, null, null, null, null, 5, null], "countDices failed #3");
totalDots = getTotalDots(rollResult);
assert(totalDots == 25, "getTotalDots failed #3");

assert(scoreXOfAKind(3, countResult, totalDots) == totalDots, "scoreThreeOfAKind failed #3");
assert(scoreXOfAKind(4, countResult, totalDots) == totalDots, "scoreFourOfAKind failed #3");
assert(scoreFullHouse(countResult) == 0, "scoreFullHouse failed #3");
assert(scoreSmallStraight(countResult) == 0, "scoreSmallStraight failed #3");
assert(scoreLargeStraight(countResult) == 0, "scoreLargeStraight failed #3");
assert(scoreXOfAKind(5, countResult, yahtzeeScore) == yahtzeeScore, "scoreYahtzee failed #3");