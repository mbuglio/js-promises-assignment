async function getNumberFact(number){
    try{
        const res = await axios.get(`http://numbersapi.com/${number}?json`)
        return res.data.text;
    }catch(error){
        console.error('Error getting number fact', error.message);
        throw error;
    }

}

async function getMultipleNumberFacts(numbers){
    try{
        const res = await axios.all(numbers.map(number => axios.get(`http://numbersapi.com/${number}?json`)));
        return res.map(res => res.data.text);
    }catch(error){
        console.error('Error getting multiple facts', error.message);
        throw error;
    }
}

async function getFourFactsOnFaveNum(faveNum){
    try{
        const facts = await getMultipleNumberFacts([faveNum, faveNum, faveNum, faveNum]);
        return facts;
    }catch(error){
        console.error('Error getting four fave facts', error.message);
        throw error;
    }
}

const faveNum = 89;

async function appendFactsToPage() {
    const numFactsDiv = document.getElementById('numFacts');

    try {
        const factAboutFaveNum = await getNumberFact(faveNum);
        numFactsDiv.innerHTML += `<p>Fact about Fave Num: ${factAboutFaveNum}</p>`;

        const factsForMultipleNums = await getMultipleNumberFacts([7, 8, 9]);
        numFactsDiv.innerHTML += `<p>Facts for multiple nums: ${factsForMultipleNums.join(', ')}</p>`;

        const fourFactsOnFaveNum = await getFourFactsOnFaveNum(faveNum);
        numFactsDiv.innerHTML += `<p>Four facts on fave num: ${fourFactsOnFaveNum.join(', ')}</p>`;
    } catch (error) {
        console.error('Error!', error.message);
    }
}

appendFactsToPage()