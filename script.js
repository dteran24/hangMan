const categories = [["audi", "bmw", "kia"],
                    ["cat","dog","lizard"],
                    ["texas", "kansas", "alabama"]]
let answer='';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
var chosenCategory;
const figureParts = document.querySelectorAll('.figurePart');
function selectedWord(){
    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    answer = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    subjectNotify();
}
function subjectNotify(){
    if(chosenCategory === categories[0]){
        document.getElementById('subject').innerHTML = "The subject is cars.";
    }
    else if( chosenCategory === categories[1]){
        document.getElementById('subject').innerHTML = "The subject is animals.";
    }else if( chosenCategory === categories[2]){
        document.getElementById('subject').innerHTML = "The subject is states.";
    };
}
function createButtons(){
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button class = "bttnGuess"
            id = '` + letter +`'
            onClick = "handleGuess('` + letter + `')"
            >
            ` + letter + `
        </button>
    `).join('');
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter){
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if(answer.indexOf(chosenLetter) >= 0){
        guessedWord();
        checkGame();
    } else if(answer.indexOf(chosenLetter) === -1){
        mistakes++;
        updateMistakes();
        checkGame();
        updateStickMan();
    }
    }
function updateStickMan(){
    figureParts.forEach((part, index) => {
        const errors = mistakes;
        if( index < errors){
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
        
    });
}
function checkGame(){
    if(wordStatus === answer){
        document.getElementById('keyboard').innerHTML = "You Won!"
    }
    if( mistakes === maxWrong){
        document.getElementById('keyboard').innerHTML = "You Lost!"
        document.getElementById('wordSpotlight').innerHTML = "The answer was " + answer;
    }
}
function guessedWord(){
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}
function updateMistakes(){
    document.getElementById('mistakes').innerHTML = mistakes;
}
function reset(){
     mistakes = 0;
     guessed = [];

    selectedWord();
    createButtons();
    guessedWord();
    updateMistakes();
    subjectNotify();
    updateStickMan();

}

document.getElementById('maxWrong').innerHTML = maxWrong;


selectedWord();
createButtons();
guessedWord();