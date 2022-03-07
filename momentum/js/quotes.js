'use strict'

const quoteOut = document.querySelector('.quote-text'),
      authorOut = document.querySelector('.author'),
      changeQuote = document.querySelector('.change-quote');

const randomNumForArr = (arr) => {
    return Math.round(Math.random() * arr.length)
}

function quotesFunc(
    quotesLang = './js/quotes_en.json',
    ) {
    async function requestQuotes() {
        try {

            const quotes = quotesLang;
            const response = await fetch(quotes);
            const data = await response.json();
            
            let ranNu = randomNumForArr(data);
            quoteOut.textContent = `"${data[ranNu].text}"`
            authorOut.textContent = data[ranNu].author ? 
                `${data[ranNu].author}` :
                    '';
        } catch (e) {
            console.error(e);
            quoteOut.textContent = `Quotes is lost :(`
        }
    }
    
    requestQuotes()

    changeQuote.addEventListener('click', requestQuotes);
}

quotesFunc();

export {quotesFunc}

// async function requestQuotes(quotesLang = './js/quotes_en.json') {
//     try {
//         const quotes = quotesLang;
//         const response = await fetch(quotes);
//         const data = await response.json();
        
//         let ranNu = randomNumForArr(data);
//         quoteOut.textContent = `"${data[ranNu].text}"`
//         authorOut.textContent = data[ranNu].author ? 
//             `${data[ranNu].author}` :
//                 '';
//     } catch (e) {
//         console.error(e);
//         quoteOut.textContent = `Quotes is lost :(`
//     }
// }

// requestQuotes()

// changeQuote.addEventListener('click', () => requestQuotes());