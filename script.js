// all the neccessary DOM elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//start loader
const Loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//stop loader (completed)
const complete = () => {
    if(!loader.hidden){
        loader.hidden =true;
        quoteContainer.hidden = false;
    }
}

//Get quote from API

const getQuote = async() => {
    //start loading ..
    Loading();
    const apiUrl = 'https://api.quotable.io/random';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.author.length > 0){
            authorText.innerText = data.author;
        }else{
            authorText.innerText = 'unknown'
        }
        if(data.content.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.content;
        //completed the task
        complete()
    }catch(error){
        console.log('error', error);
    }
} 

// tweet functionality
const tweetQuote = () => {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(tweetUrl,'_blank')
}

// add event to tweet button
twitterBtn.addEventListener('click', () => {
    tweetQuote();
})

// onclick event listner for newquote
newQuote.addEventListener('click', () => {
    //run the getQuote method
    getQuote(); 
})

