// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let userAnswer = [];
function initialPrompt() {
  let userWord = input.question(`Let's play some Scrabble!\n\nEnter a word to score: `);
  userAnswer.push(userWord);
  return userWord;
}

function simpleScore(word) {
  let letterPoints = word.length;
  return letterPoints; 
} 

function vowelBonusScore(word) {
  let letterPoints=0;
  word = word.toUpperCase();
  for (let i=0; i<word.length; i++){
    if (word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U"){
      letterPoints+=3;
    } else {
      letterPoints+=1;
    }
  }
  return letterPoints;
}

function scrabbleScore(word) {
  word = word.toLowerCase();
	let pointValue = 0;
	for (let i = 0; i < word.length; i++) {
	  for (letterKeys in newPointStructure) {
		 if (letterKeys === word[i]) {
       pointValue += Number(newPointStructure[letterKeys]);
		 }
	  }
	}
	return pointValue;
}

const scoringAlgorithms = [ 
  Object({ 
    name: 'Simple Score', 
    description: 'Each letter is worth 1 point.', 
    scoringFunction: simpleScore}), 
  Object({ 
    name: 'Bonus Vowels', 
    description: 'Vowels are 3 pts, consonants are 1 pt.', 
    scoringFunction: vowelBonusScore}), 
  Object({ 
    name: 'Scrabble', 
    description: 'The traditional scoring algorithm.', 
    scoringFunction: scrabbleScore}) ];

function scorerPrompt() {  
 let userChoice = Number(input.question(`\nWhich scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: `));
 if (userChoice === 0){
    //console.log(`${userChoice} - algorithm name: ${scoringAlgorithms[0].name}`);
    console.log(`Score for '${userAnswer[0]}' : ${scoringAlgorithms[0].scoringFunction(userAnswer[0])}`);
    return userChoice;
 } else if (userChoice === 1){
    //console.log(`${userChoice} - algorithm name: ${scoringAlgorithms[1].name}`);
    console.log(`Score for '${userAnswer[0]}': ${scoringAlgorithms[1].scoringFunction(userAnswer[0])}`);
    return userChoice;
  } else if (userChoice === 2){
    //console.log(`${userChoice} - algorithm name: ${scoringAlgorithms[2].name}`);
    console.log(`Score for '${userAnswer[0]}' : ${scoringAlgorithms[2].scoringFunction(userAnswer[0])}`);
    return userChoice;
  } else {
    console.log('Error. The number entered does not match an existing scoring algorithm. Please start again and pick a number between 0-2 (all included).');
  }
}

function transform(object) {
  let transformedObject = {};
  for (key in object) {
    
    for(let i=0; i<object[key].length;i++){
      //object[key][i] = object[key][i].toLowerCase();
      object[key]= object[key].sort();
      transformedObject[object[key][i].toLowerCase()] = key;
     
    }
    /*  Option to alphabetically sort keys
    transformedObject = Object.keys(transformedObject).sort().reduce(function (result, key) {
    result[key] = transformedObject[key];
    return result;
    }, {}); */
    
   
  }
  return transformedObject;
}

let newPointStructure = transform(oldPointStructure);


function runProgram() {
  initialPrompt();
  scorerPrompt();
  
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

