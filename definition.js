

;
/*
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com',
		'X-RapidAPI-Key': '14e2e88569msh7b45d9c539dfc88p18e8fajsn13996baf9a1c'
	}
};

const fetchUrbanWord = async word => {
   // https://rapidapi.com/community/api/urban-dictionary

  console.log('PPP '+word)
  
   fetch('https://mashape-community-urban-dictionary.p.rapidapi.com/define?term='+word, options)
	.then(response => response.json()) 
	.then(response => console.log('TTT '+response))
	.catch(err => console.error(err));
 
  
};
*/

const DICTIONARY_API_BASE_URL =
    'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DEFINITIONS_DIV = document.getElementById('definitions')


var guessCount = 0;
var attemptButton = document.getElementById('attempts');

var guessList ='';
//randomWordReturned = '';

const fetchWordDefinitions = async word => {
    console.log(`Making request for definitions of ${word}...`);
    const response = await fetch(DICTIONARY_API_BASE_URL + word);
    const json = await response.json();
    return json[0].meanings
        .flatMap(m => m.definitions)
        .flatMap(d => d.definition);
};




const getRandomWordDefinition = () => {

   
    definitionCount = 0;
    if (randomWord == null || randomWord == '') {
        return alert('Error: RandomWord is null');
    }
    
    
    wordLen = randomWord.length;
    
    if (guessCount ==0 )
      DEFINITIONS_DIV.innerHTML = '<i> Word length: '+wordLen+'<\i>';
    else 
      DEFINITIONS_DIV.innerHTML = '<i> Word length: '+wordLen+', Guesses: '+guessList +'<\i>';
    DEFINITIONS_DIV.innerHTML += '';
    fetchWordDefinitions(randomWord)
        .then(defintions => {
            defintions.forEach(d => {
                 if (definitionCount <= guessCount) {
                  DEFINITIONS_DIV.innerHTML += `<p>${d}</p>`;
                  definitionCount = definitionCount + 1;
                  
                  }
            });
        })
        .catch(_ => {
            DEFINITIONS_DIV.innerHTML += `<p>Error: Could not retrive any defintions for "${randomWord}".</p>`;
            DEFINITIONS_DIV.innerHTML += `<p><b>Word is too obscure. Click again for another definition.</b></p>`;
        });
        return (randomWord);
};


const checkMyGuess = () => {
    const myguess = document.getElementById('myguess').value;
    if (myguess == null || myguess == '') {
        return alert('Error: Please enter a guess');
    }
    
    
    guessCount = guessCount+1;
    
        
    if (guessCount >= 6) {
        guessCount = 0;
        attemptButton.style.backgroundColor = 'yellow';
        attemptButton.value = "The word was '"+randomWord+"'";
        clearInterval(myTimer);
        document.getElementById("progressBar").value = 0;
        return alert('Too many tries');
    }   else {
    
      lcguess = myguess.toLowerCase();
      lcguess = lcguess.trim();
      
     
    
      if (guessCount > 1) {
        guessList = guessList + ', '+ lcguess;
      } else {  guessList = lcguess ;  } 
     
    
     //  
     
        
      if (lcguess == randomWord) {
        clearInterval(myTimer);
        document.getElementById("progressBar").value = 0;
        attemptButton.style.backgroundColor = 'lime';
        attemptButton.value = 'Correct! Got it in  '+guessCount.toString();
        guessCount = 0;
        
        document.getElementById('myguess').value = '';
        
    } else {
        attemptButton.style.backgroundColor = 'red';
        attemptButton.value = 'Incorrect. Attempt: '+guessCount.toString();
       document.getElementById('myguess').value = randomWord.substring(0,guessCount);
       
          
       getRandomWordDefinition();
    }
    
    }
    
    
};

const iGiveUp = () => {
  attemptButton.style.backgroundColor = 'yellow';
  attemptButton.value = "The word was '"+randomWord+"'";
  randomWord = '';
  guessCount = 0;
};