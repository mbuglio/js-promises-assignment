function getNumberFact(number){
    return axios.get(`http://numbersapi.com/${number}?json`)
    .then(res => res.data.text)
    .catch(err => {
        console.log(err);
        return 'So sorry there is no fact returned sad face.'
    })
}

function showNumberFacts(){
    const faveNum = 89;
    const factNum = 4;

    getNumberFact(faveNum).then(singleFact => {
        console.log(singleFact);

        const multipleNums = [6, 9, 5];
        const multiplePromises = multipleNums.map(getNumberFact);
        Promise.all(multiplePromises).then(multipleFacts => {
            console.log(multipleFacts);

            const favoritePromises = Array.from({length: factNum}, () => getNumberFact(faveNum));
            Promise.all(favoritePromises).then(multipleFactsFavorite => {
                console.log(multipleFactsFavorite);

                const factsContainer = document.getElementById('numberFacts');
                factsContainer.innerHTML = `
                <p>Favorite number fact: ${singleFact}</p>
                <p>Multiple numbers facts: ${multipleFacts}</p>
                <p>Favorite number facts: ${multipleFactsFavorite}</p>`;
            })
            .catch(error => {
                console.error("Error fetching favorite number facts:", error);
            });
    })
    .catch(error => {
        console.error("Error fetching multiple numbers facts:", error);
    });
})
.catch(error => {
console.error("Error fetching favorite number fact:", error);
});
}

showNumberFacts();