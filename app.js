/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 2;

let scores = [0, 0];
let activePlayer = 0;
let current = 0;
const LIMIT = 100;
const diceElement = document.querySelectorAll('.dice');

const limit = document.querySelector('.limit__content');

limit.value = LIMIT;


const initGame = () => {
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    diceElement.forEach(e => e.style.display = 'none');
}

initGame();

limit.addEventListener('input', function ({target: {value}}) {
    if (+value.match(/^\d+$/)) {
        limit.value = +value;
        limit.focus()
        limit.value.selectionStart = limit.value.length
    } else {
        limit.value = null;
    }
})

limit.addEventListener('blur', ({target: {value}}) => {
    if (value.length <= 0 || value == 0) {
        limit.value = 100
    }

})

document.querySelector('.btn-roll').addEventListener('click', function () {
    let dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];

    dice.forEach((e, i) => diceElement[i].src = `dice-${e}.png`)

    diceElement.forEach(e => e.style.display = 'block');

    if (diceValidate(dice, RESET_VALUE)) {
        current += sumDice(dice);
        document.getElementById('current-' + activePlayer).textContent = current;

        if (scores[activePlayer] + current >= +limit.value) {
            alert(`Player ${activePlayer} won!!!`);
        }

    } else {
        changePlayer();
    }
});

const diceValidate = (arr, reset) => {
    if (arr.some(e => e === reset)) {
        return false
    }
    const filter = arr.filter((e, i) => arr.indexOf(e) === i);
    return filter.length > 1;
}

const sumDice = (arr) => {
    return arr.reduce((res, e) => (res + e), 0)
}

const changePlayer = () => {
    current = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    activePlayer = +!activePlayer;
    diceElement.forEach(e => e.style.display = 'none');
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function () {
    scores[activePlayer] += current;
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    changePlayer();
});


document.querySelector('.btn-new').addEventListener('click', function () {
    initGame();
});
