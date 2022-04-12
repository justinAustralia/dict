var TOKEN = '411c545f696ffeed4cc823465d458374e8b89ced';
var owlResponse;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchOwlDefinitions(word) {

   
   await fetch('https://owlbot.info/api/v4/dictionary/'+word, {
     headers: {
     'Authorization': 'Token ' + TOKEN
     } 
   })
	.then(response =>  response.json()) 
	.then (response =>  {
      // console.log('AAA '+getObjects(response,'','No definition'));
       noDefs = response.definitions.length;
      // for (i=0; i<noDefs; i++) console.log(i+") "+response.definitions[i].definition);
       owlResponse = response;
       return (1);
   })
	.catch(err => {
    console.error(err);
    owlResponse = undefined;
    return (0);
    })
 
return (0);

}
 
  

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




async function getRandomWordDefinition  ()  {

   
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
    
    owlDefs = await fetchOwlDefinitions(randomWord);
    
    if ((owlResponse ==='undefined') || (typeof(owlResponse) === 'undefined')) {
      DEFINITIONS_DIV.innerHTML = '';
      noDefs = 0;
     // attemptButton.style.backgroundColor = 'orange';
      //attemptButton.value = "'"+randomWord+"' is too obscure. Trying again";
      console.log('Word: '+'"'+randomWord+'"'+' is too obscure');
      sleep (500);
      onClick=document.getElementById("definition").click();
      return;
    //  return alert ('Word: '+'"'+randomWord+'"'+' is too obscure. Please click for a new word');
   
    } else  noDefs =  owlResponse.definitions.length
   
   
    for (i=0; i<noDefs; i++) {
          definition = owlResponse.definitions[i].definition;
          if (definitionCount <= guessCount) {
                  DEFINITIONS_DIV.innerHTML += `<p>${definition}</p>`;
                  definitionCount = definitionCount + 1;
                  
                  }
    }
          
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
     //  clearInterval(myTimer);
      //document.getElementById("progressBar").value = 0;
        return alert('Too many tries');
    }   else {
    
      lcguess = myguess.toLowerCase();
      lcguess = lcguess.trim();
      
     
    
      if (guessCount > 1) {
        guessList = guessList + ', '+ lcguess;
      } else {  guessList = lcguess ;  } 
     
    
     //  
     
        
      if (lcguess == randomWord) {
       // clearInterval(myTimer);
       // document.getElementById("progressBar").value = 0;
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
 // randomWord = '';
  guessCount = 0;
};