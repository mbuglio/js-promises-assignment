async function drawSingleCard(){
    try{
        const res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        const card = res.data.cards[0];
        console.log(`${card.value} of ${card.suit}`)
    }catch(error){
        console.error('Error drawing single card', error.message);
    }
}
drawSingleCard()

async function drawTwoCardsFromSameDeck(){
    try{
        const res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=2');
        const cards = res.data.cards;

        for (const card of cards){
            console.log(`${card.value} of ${card.suit}`)
        }
    }catch(error){
        console.error('Error drawing multiple cards from the same deck', error.message)
    }
}
drawTwoCardsFromSameDeck()

document.addEventListener('DOMContentLoaded', () => {
    const cardDisplay = document.getElementById('cardDisplay');
    const drawButton = document.getElementById('drawButton');
    let deckID;

    async function createNewDeck() {
        try{
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
            deckID = res.data.deck_id;
        }catch(error){
            console.error('Error in creating new deck', error.message);
        }
    }

    async function drawCardFromDeck(){
        try{
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
            const card = res.data.cards[0];
            const cardImage = document.createElement('img');

            cardImage.src = card.image;
            cardImage.alt = `${card.value} of ${card.suit}`;
            cardDisplay.appendChild(cardImage);
            
        }catch(error){
            console.error('Error drawing card from deck!', error.message);
        }
    }
    createNewDeck();

    drawButton.addEventListener('click', drawCardFromDeck);
})