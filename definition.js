

const DICTIONARY_API_BASE_URL =
    'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DEFINITIONS_DIV = document.getElementById('definitions');

var guessCount = 0;
var attemptButton = document.getElementById('attempts');
//randomWordReturned = '';

const fetchWordDefinitions = async word => {
    console.log(`Making request for definitions of ${word}...`);
    const response = await fetch(DICTIONARY_API_BASE_URL + word);
    const json = await response.json();
    return json[0].meanings
        .flatMap(m => m.definitions)
        .flatMap(d => d.definition);
};

const getWordDefinitions = () => {
    const myguess = document.getElementById('myguess').value;
    if (myguess == null || myguess == '') {
        return alert('Error: You must enter a word to fetch');
    }
    DEFINITIONS_DIV.innerHTML = '';
    fetchWordDefinitions(myguess)
        .then(defintions => {
            defintions.forEach(d => {
                DEFINITIONS_DIV.innerHTML += `<p>${d}</p>`;
            });
        })
        .catch(_ => {
            DEFINITIONS_DIV.innerHTML += `<p>Error: Could not retrive any defintions for ${myguess}.</p>`;
        });
};

const getRandomWordDefinition = () => {

   
    definitionCount = 0;
    if (randomWord == null || randomWord == '') {
        return alert('Error: RandomWord is null');
    }
    
    wordLen = randomWord.length;
    DEFINITIONS_DIV.innerHTML = '<i> Word length '+wordLen+' letters <\i>';
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
            DEFINITIONS_DIV.innerHTML += `<p>Error: Could not retrive any defintions for ${randomWord}.</p>`;
        });
        return (randomWord);
};


const checkMyGuess = () => {
    const myguess = document.getElementById('myguess').value;
    if (myguess == null || myguess == '') {
        return alert('Error: Please enter a guess');
    }
    
    guessCount = guessCount+1;
    
        
    if (guessCount >= 10) {
        guessCount = 0;
        attemptButton.value = "The word was '"+randomWord+"'";
        return alert('Too many tries');
    }   else {
    
      lcguess = myguess.toLowerCase();
      lcguess = lcguess.trim();
    
    //  attemptButton.value = 'Guess '+guessCount.toString();
     
        
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
    
    
};

const iGiveUp = () => {
  attemptButton.value = "The word was '"+randomWord+"'";
  guessCount = 0;
};