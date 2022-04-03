

const DICTIONARY_API_BASE_URL =
    'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DEFINITIONS_DIV = document.getElementById('definitions');

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
        attemptButton.value = "The word was '"+randomWord+"'";
        return alert('Too many tries');
    }   else {
    
      lcguess = myguess.toLowerCase();
      lcguess = lcguess.trim();
    
      if (guessCount > 1) {
        guessList = guessList + ', '+ lcguess;
      } else {  guessList = lcguess ;  } 
     
    
     //  
     
        
      if (lcguess == randomWord) {
        attemptButton.style.backgroundColor = 'lime';
        attemptButton.value = 'Correct! Got it in  '+guessCount.toString();
        guessCount = 0;
        // return alert('Correct!');
        
    } else {
        attemptButton.style.backgroundColor = 'red';
        attemptButton.value = 'Incorrect. Attempt: '+guessCount.toString();
        
          
         getRandomWordDefinition();
    }
    
    }
    document.getElementById('myguess').value = '';
    
};

const iGiveUp = () => {
  attemptButton.value = "The word was '"+randomWord+"'";
  guessCount = 0;
};