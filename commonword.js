
randomWord = '';
const WAIT_TIME = 30;
var timeLeft = WAIT_TIME;

var myTimer = null;

// Use https://random-word-api.herokuapp.com/home
//RANDOM_WORD_DICT = 'https://random-word-api.herokuapp.com/word?number=1&swear=0';
RANDOM_WORD_DICT = 'https://random-word-api.herokuapp.com/word';

async function fetchRandomWord () {

console.log(`Making request for random word`);

var request = new XMLHttpRequest();
request.open("GET", RANDOM_WORD_DICT, false);
request.send(null);

guessCount = 0;
guessList ='';


s = request.responseText;
answer = s.match(/"([^"]+)"/)[1];
randomWord = answer;  



}


function setTimer () {
  
  myTimer = setInterval(function(){
    if(timeLeft <= 0){
      clearInterval(myTimer);
      iGiveUp();
      timeLeft = WAIT_TIME;
    }
    document.getElementById("progressBar").value = WAIT_TIME - timeLeft;
     timeLeft -= 1;
    }, 1000);
    
}

const getRandomWord = () => {

var allWords = JSON.parse(data);
totalWordCount = Object.keys(allWords.data).length;

checkbox = document.getElementById('obscureToggle').checked;

if (checkbox) fetchRandomWord();
else  {
  const randomIndex = Math.floor(Math.random() * totalWordCount);
  randomWord = allWords.data[randomIndex]
}





console.log('randomWord is: '+randomWord);


attemptButton.value = '----';
attemptButton.style.backgroundColor = 'white';
myguess.value = '';
guessCount = 0;
guessList ='';

//if (myTimer !=null) clearInterval(myTimer);
//setTimer ();

return (randomWord)


};
