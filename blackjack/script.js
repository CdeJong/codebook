
// The value, one of A (for an ace), 2, 3, 4, 5, 6, 7, 8, 9, 0 (for a ten), J (jack), Q (queen), or K (king);
// The suit, one of S (Spades), D (Diamonds), C (Clubs), or H (Hearts).
// Image api: https://deckofcardsapi.com/static/img/<id>.png
const deckOfCards = [
    "AS", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A0", "AJ", "AQ", "AK",
    "DS", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D0", "DJ", "DQ", "DK",
    "CS", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C0", "CJ", "CQ", "CK",
    "HS", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H0", "HJ", "HQ", "HK"
];

let dealerCards = [];
let playerCards = [];


const drawCard = () => {
    let cardIndex = Math.floor(Math.random() * deckOfCards.length); // not random?
    return deckOfCards.pop(cardIndex);
}

for(let i = 0; i < 52; i++) {
    console.log(drawCard());
    console.log(deckOfCards);
}