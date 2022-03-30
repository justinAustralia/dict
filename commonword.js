
randomWord = '';

const getRandomWord = () => {

var allWords = JSON.parse(data);
totalWordCount = Object.keys(allWords.data).length;


const randomIndex = Math.floor(Math.random() * totalWordCount);

console.log('randomWord is: '+allWords.data[randomIndex]);

randomWord = allWords.data[randomIndex]

attemptButton.value = 'Reveal Answer';
myguess.value = '';


return (randomWord)


};
