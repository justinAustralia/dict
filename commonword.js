
randomWord = '';
// Use https://random-word-api.herokuapp.com/home
RANDOM_WORD_DICT = 'https://random-word-api.herokuapp.com/word?number=1&swear=0';

async function fetchRandomWord () {

console.log(`Making request for randwom word`);

var request = new XMLHttpRequest();
request.open("GET", RANDOM_WORD_DICT, false);
request.send(null);


s = request.responseText;
answer = s.match(/"([^"]+)"/)[1];



randomWord = answer;  


}



const getRandomWord = () => {

var allWords = JSON.parse(data);
totalWordCount = Object.keys(allWords.data).length;


const randomIndex = Math.floor(Math.random() * totalWordCount);
//fetchRandomWord();

randomWord = allWords.data[randomIndex]




console.log('randomWord is: '+randomWord);

attemptButton.value = '----';
attemptButton.style.backgroundColor = 'white';
myguess.value = '';


return (randomWord)


};
