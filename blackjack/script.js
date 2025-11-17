
const startAmount = 2;
const allowPushAt = 16;
const standAt = 17;
const imageUrl = "https://deckofcardsapi.com/static/img/";
const dealerDrawCardDelay = 1000; // ms

let deckOfCards = [];
let dealerCards = [];
let playerCards = [];
let isStarted = false;

const winMessageElement = document.getElementById("winMessage");
const hitButtonElement = document.getElementById("hitButton");
const standButtonElement = document.getElementById("standButton");
const dealerScoreElement = document.getElementById("dealerScore");
const playerScoreElement = document.getElementById("playerScore");
const dealerCardsElement = document.getElementById("dealerCards");
const playerCardsElement = document.getElementById("playerCards");

hitButtonElement.addEventListener("click", () => handleHitButtonClick());
standButtonElement.addEventListener("click", () => handleStandButtonClick());

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
}

// todo move this, is it allowed to be a const?
const cardTemplateElement = document.getElementById("cardTemplate");

const updateView = (hideCard = true) => {
    updateScore(dealerScoreElement, dealerCards, hideCard);
    updateScore(playerScoreElement, playerCards);

    // clear current
    dealerCardsElement.innerHTML = "";
    playerCardsElement.innerHTML = "";

    for (let i = 0; i < dealerCards.length; i++) {
        let cardId = dealerCards[i];

        // hide first card if needed
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
    hitButtonElement.disabled = null;
    standButtonElement.disabled = "disabled";
    isStarted = false;
}

const handleHitButtonClick = () => {
    if (isStarted) {
        handleHit();
    } else {
        handleStart();
    }
}

const handleStart = () => {
    winMessageElement.innerHTML = "";
    resetDeck();
    playerCards = [];
    dealerCards = [];

    handOutCards();
    updateView();

    hitButtonElement.innerHTML = "Hit";
    standButtonElement.disabled = null;

    let dealerScores = scoreCards(dealerCards);
    let playerScores = scoreCards(playerCards);

    let dealerHasBlackjack = dealerScores.includes(21);
    let playerHasBlackjack = playerScores.includes(21);

    if (dealerHasBlackjack || playerHasBlackjack) {
        endGame();
    } else {
        isStarted = true; // no blackjack, set started so player can start hitting
        return; // no need to handle win messages
    }

    if (dealerHasBlackjack && playerHasBlackjack) {
        winMessageElement.innerHTML = "Push";
    } else if (dealerHasBlackjack) {
        winMessageElement.innerHTML = "Dealer Blackjack, Dealer Wins";
    } else if (playerHasBlackjack) {
        winMessageElement.innerHTML = "Player Blackjack, Player Wins";
    }

}

const handleHit = () => {
    playerCards.push(drawCard());

    let playerScores = scoreCards(playerCards);

    if (playerScores.length == 0) {
        winMessageElement.innerHTML = "Player Bust, Dealer Wins";
        endGame();
        return;
    } 
    
    updateView(true);

    // just let the player click stand themselves
    // if (playerScores.includes(21)) {
    //     // auto stand
    //     handleStandButtonClick();
    // }
    
}

const handleStandButtonClick = () => {
    hitButtonElement.disabled = "disabled";
    standButtonElement.disabled = "disabled";

    let playerScores = scoreCards(playerCards);
    let playerHighest = getHighestValidScore(playerScores);

    updateView(false); // make card visible
    dealerDrawCards(playerHighest); // start drawing cards if needed

}

const getHighestValidScore = (scores) => {
    let highest = -1; // no valid score found, BUST
    
    for (let score of scores) {
        if (score > highest) {
            highest = score;
        }
    }

    return highest;
}

const dealerDrawCards = (playerHighest) => {

    let dealerScores = scoreCards(dealerCards);
    let dealerHighest = getHighestValidScore(dealerScores);

    // push is a draw/tie, currently set at 16
    if (playerHighest === allowPushAt && dealerHighest === allowPushAt) {
        winMessageElement.innerHTML = "Push";
        endGame();
        return;
    }

    // no highest score found, so dealer went bust
    if (dealerHighest === -1) {
        winMessageElement.innerHTML = "Dealer Bust, Player Wins";
        endGame();
        return;
    }

    // allow dealer to stand at, currently 17
    if (dealerHighest >= standAt) {
        if (playerHighest > dealerHighest) {
            winMessageElement.innerHTML = "Player Wins";
        } else if (playerHighest < dealerHighest) {
            winMessageElement.innerHTML = "Dealer Wins";
        } else {
            winMessageElement.innerHTML = "Push";
        }
        endGame();
        return;
    }

    // draw another card in 1s
    setTimeout(() => {
        dealerCards.push(drawCard());
        updateView(false);

        dealerDrawCards(playerHighest)
    }, dealerDrawCardDelay);
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

