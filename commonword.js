const getRandomWord = () => {

var allWords = JSON.parse(data);
totalWordCount = Object.keys(allWords.data).length;

console.log(totalWordCount);

const randomIndex = Math.floor(Math.random() * totalWordCount);
const i = 23;
console.log(randomIndex);
console.log(allWords.data[randomIndex]);

return (allWords.data[randomIndex])


};
