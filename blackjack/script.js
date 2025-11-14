
const startAmount = 2;
const imageUrl = "https://deckofcardsapi.com/static/img/";

let deckOfCards = [];
let dealerCards = [];
let playerCards = [];

const resetDeck = () => {
    // The value, one of A (for an ace), 2, 3, 4, 5, 6, 7, 8, 9, 0 (for a ten), J (jack), Q (queen), or K (king);
    // The suit, one of S (Spades), D (Diamonds), C (Clubs), or H (Hearts).
    // Image api: https://deckofcardsapi.com/static/img/<id>.png

    deckOfCards = [
        "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "0S", "JS", "QS", "KS",
        "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "0D", "JD", "QD", "KD",
        "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "0C", "JC", "QC", "KC",
        "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "0H", "JH", "QH", "KH"
    ];
}

const drawCard = () => {
    let cardIndex = Math.floor(Math.random() * deckOfCards.length);
    let deletedArray = deckOfCards.splice(cardIndex, 1); // removes at index
    return deletedArray[0]; // should be 0-1, if 0 returns undefined? 
}

// start
const handOutCards = () => {
    for (let i = 0; i < startAmount; i++) {
        dealerCards.push(drawCard());
        playerCards.push(drawCard());
    }
    updateView();
}

// todo move this, is it allowed to be a const?
const cardTemplateElement = document.getElementById("cardTemplate");

const updateView = (hideCard = true) => {
    let dealerScoreElement = document.getElementById("dealerScore");
    let playerScoreElement = document.getElementById("playerScore");
    updateScore(dealerScoreElement, dealerCards, hideCard);
    updateScore(playerScoreElement, playerCards);


    let dealerCardsElement = document.getElementById("dealerCards");
    let playerCardsElement = document.getElementById("playerCards");

    // clear current
    dealerCardsElement.innerHTML = "";
    playerCardsElement.innerHTML = "";

    for (let i = 0; i < dealerCards.length; i++) {
        let cardId = dealerCards[i];

        if (hideCard && i == 0) {
            cardId = "back";
        }

        updateCard(cardId, dealerCardsElement);
    }

    for (let i = 0; i < playerCards.length; i++) {
        let cardId = playerCards[i];

        updateCard(cardId, playerCardsElement);
    }
}

const updateScore = (element, cards, hideCard = false) => {
    if (hideCard) {
        cards = cards.slice(1); // ignore first card    
    }

    let scores = scoreCards(cards);
    let result = "BUST";

    for (let i = 0; i < scores.length; i++) {
        let score = scores[i];
        if (score == 21) {
            if (cards.length == 2) {
                result = "BLACKJACK";
            } else {
                result = "21";
            }
            break;
        }

        if (i == 0) { // first
            result = score.toString();
        } else {
            result += " / " + score.toString();
        }
    }

    element.innerHTML = result;
}

const scoreCards = (cards) => {
    let scores = [0];

    for (let card of cards) {
        let type = card.charAt(0);
        let newScores = [];

        for (let current of scores) {
            switch (type) {
                case 'A':
                    newScores.push(current + 1);
                    newScores.push(current + 11);
                    break;  
                case '0':
                case 'J':
                case 'Q':
                case 'K':
                    newScores.push(current + 10);
                    break;
                default:
                    let value = parseInt(type);
                    if (isNaN(value)) { // Not-A-Number, as we didnt have enough null types in javascript
                        // should not be possible, but I think its a bad practice to not handle parse errors.
                        throw new Error("Invalid card id in cards");
                    }
                    newScores.push(current + value);          
            } 
        }
        scores = newScores;
    }

    // remove duplicates and invalid scores

    let finalScores = [];
    for (let score of scores) {
        if (score > 21) {
            continue;
        }
        if (finalScores.includes(score)) {
            continue;
        }
        finalScores.push(score)
    }

    return finalScores;

}

const updateCard = (id, element) => {
    const clonedCardElement = cardTemplateElement.content.cloneNode(true);
    let imageElement = clonedCardElement.querySelector("img");

    imageElement.src = imageUrl + id + ".png";
    imageElement.alt = "playing card " + id;

    element.appendChild(clonedCardElement);
}

const endGame = () => {
    updateView(false);
    hitButtonElement.innerHTML = "Start";
    standButtonElement.disabled = "disabled";
    isStarted = false;
}


let isStarted = false;

const winMessageElement = document.getElementById("winMessage");
const hitButtonElement = document.getElementById("hitButton");
hitButtonElement.addEventListener("click", () => handleHitButtonClick());
const standButtonElement = document.getElementById("standButton");
standButtonElement.addEventListener("click", () => handleStandButtonClick());

const handleHitButtonClick = () => {
    if (isStarted) {
        handleHit();
    } else {
        handleStart();
        isStarted = true;
    }
    
    // should the game stop

    let playerScores = scoreCards(playerCards);

    if (playerScores.length == 0) {
        winMessageElement.innerHTML = "BUST";
        endGame();
    }

}

const handleStart = () => {
    winMessageElement.innerHTML = "";
    resetDeck();
    playerCards = [];
    dealerCards = [];

    handOutCards();
    // todo check black jack

    hitButtonElement.innerHTML = "Hit";
    standButtonElement.disabled = null;

    let dealerScores = scoreCards(dealerCards);
    let playerScores = scoreCards(playerCards);

    let dealerHasBlackjack = dealerScores.includes(21);
    let playerHasBlackjack = playerScores.includes(21);

    if (dealerHasBlackjack || playerHasBlackjack) {
        endGame();
    }

    if (dealerHasBlackjack && playerHasBlackjack) {
        winMessageElement.innerHTML = "DRAW";
    } else if (dealerHasBlackjack) {
        winMessageElement.innerHTML = "BLACKJACK FOR DEALER";
    } else if (playerHasBlackjack) {
        winMessageElement.innerHTML = "BLACKJACK";
    }

    
}

const handleHit = () => {
    playerCards.push(drawCard());

    let playerScores = scoreCards(playerCards);

    if (playerScores.includes(21)) {
        // auto stand
        handleStandButtonClick();
    } else {
        updateView(true);
    }
}

const handleStandButtonClick = () => {
    hitButtonElement.disabled = "disabled";
    standButtonElement.disabled = "disabled";

    let playerScores = scoreCards(playerCards);
    let playerHighest = getHighestValidScore(playerScores);

    dealerDrawCard(playerHighest);

}

const getHighestValidScore = (scores) => {
    let highest = -1;
    
    for (let score of scores) {
        if (score > highest) {
            highest = score;
        }
    }

    return highest;
}

const dealerDrawCard = (playerHighest) => {
    dealerCards.push(drawCard());

    let dealerScores = scoreCards(dealerCards);
    let dealerHighest = getHighestValidScore(dealerScores);

    if (playerHighest === 16 && dealerHighest === 16) {
        // stop draw
        return;
    }

    if (dealerHighest !== -1 && dealerHighest < 17) {
        // draw an card
        setTimeout(() => dealerDrawCard(playerHighest), 500);
    }
    updateView(false);
    
}




// debug

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
        throw new Error((message || "Array Assertion Failed") + ": [" + a + "] is not the same as [" + b + "]");
    }
}

// tests

assertArray(scoreCards([]), [0], "Test #1 failed");
assertArray(scoreCards(["0D", "5D"]), [15], "Test #2 failed");
assertArray(scoreCards(["AD", "2D", "AS", "2S"]), [6, 16], "Test #3 failed");
assertArray(scoreCards(["AD", "AC", "AS", "AH"]), [4, 14], "Test #4 failed");
assertArray(scoreCards(["0D", "5C", "7S"]), [], "Test #5 failed");

