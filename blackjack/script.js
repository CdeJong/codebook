const startAmount = 2;

// The value, one of A (for an ace), 2, 3, 4, 5, 6, 7, 8, 9, 0 (for a ten), J (jack), Q (queen), or K (king);
// The suit, one of S (Spades), D (Diamonds), C (Clubs), or H (Hearts).
// Image api: https://deckofcardsapi.com/static/img/<id>.png
const deckOfCards = [
    "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "0S", "JS", "QS", "KS",
    "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "0D", "JD", "QD", "KD",
    "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "0C", "JC", "QC", "KC",
    "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "0H", "JH", "QH", "KH"
];

const imageUrl = "https://deckofcardsapi.com/static/img/";

let dealerCards = [];
let playerCards = [];

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

const scoreCards = (cards) => {
    let scores = [0];

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let type = card.charAt(0);
        let newScores = [];

        for(let j = 0; j < scores.length; j++) {
            let current = scores[j];

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
                    newScores.push(current + parseInt(type));          
            }

            console.log(newScores);
            break; // todo loops for ever, debugging
            scores = newScores;
        }

    }

    return scores;

}

const updateCard = (id, element) => {
    const clonedCardElement = cardTemplateElement.content.cloneNode(true);
    let imageElement = clonedCardElement.querySelector("img");

    imageElement.src = imageUrl + id + ".png";
    imageElement.alt = "playing card " + id;

    element.appendChild(clonedCardElement);
}

handOutCards();

console.log(scoreCards(["2D", "AD", "0D"]));

