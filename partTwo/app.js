function drawCard(){
    return axios.get('https://deckofcardsapi.com/api/deck/new/draw/')
    .then(res =>{
        const card = res.data.cards[0];
        console.log(card);
        const cardSrc = card.image;
        const cardDisplay = document.getElementById('cardDisplay');
        
        const cardImage = document.createElement('img');
        cardImage.src = cardSrc;
        cardImage.alt = `${card.value} of ${card.suit}`

        cardDisplay.appendChild(cardImage);
        
        return card;
    })
    .catch(err => console.err('Drawing card error!', err));
}

function createNewDeck(){
    return axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
    .then(res => res.data.deck_id);
}

document.getElementById('drawCardBtn').addEventListener('click', () =>{
    drawCard()
});

document.addEventListener('DOMContentLoaded', () => {
    createNewDeck()
    .then(deckId => console.log('New deck created with ID:', deckId))
    .catch(err => console.err('Creating deck error', err));
})
