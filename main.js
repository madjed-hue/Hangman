const letters = "abcdefghijklmnopqrstuvwyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter =>{
    let span = document.createElement("span"),
        theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";

    lettersContainer.appendChild(span);
})

const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
}

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueName = randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName;

let letterGuessContainer = document.querySelector('.letters-guess'),
    lettersAndSpace = Array.from(randomValueName);

lettersAndSpace.forEach(letter =>{
    let emptySpan = document.createElement('span');
    if (letter === ' ') {
        emptySpan.className = 'with-space';
    }
    letterGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll('.letters-guess span');


let wrongAttempts = 0;
let theDraw = document.querySelector('.hangman-draw');

document.addEventListener('click', function(e) {
    let theStatus = false;
    if(e.target.className === 'letter-box'){
        e.target.classList.add('clicked');

        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueName.toLowerCase());
        
        theChosenWord.forEach((wordLetter, wordIndex) =>{
            if(theClickedLetter == wordLetter){
                theStatus = true;
                guessSpans.forEach((span, spanIndex)=>{
                    if (wordIndex === spanIndex) {
                        span.innerHTML = wordLetter;
                    }
                })

            }
        })
        if (theStatus !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            // document.getElementById('fail').play();
            if (wrongAttempts == 8) {
                endGame();
                lettersContainer.classList.add('finished')
            }
        }else{
            document.getElementById('success').play();
        }
    }
})
function endGame() {

    let div = document.createElement("div");

    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueName}`);

    div.appendChild(divText);

    div.className = 'popup';

    document.body.appendChild(div);

}



