// Storing gameboard as an array inside of a Gameboard Object
// Players will also be stored in objects
// Object to control the flow of the game

const Gameboard = (() => {
    let gameboard = ['','','','','','','','',''];

    const render = () => {
        // Create the gameboard as an array of 9 empty strings.
        // Create 9 divs and keep track of index in the ID for the div
        let boardGameHTML = '';
        gameboard.forEach((square, idx) => {
            boardGameHTML += `<div class="square" id=square-${idx}>${square}</div>`;
        })
        document.querySelector(".game-board").innerHTML = boardGameHTML;

        document.querySelectorAll(".square").forEach((square) =>{
            square.addEventListener('click', Game.handleClick)
        })
    }

    const updateSquare = (square, mark) => {
        document.querySelector(`#${square.id}`).innerText = mark
        idx = square.id.split('-')[1]
        gameboard[idx] = mark
    }

    const showBoard = () =>{
        console.log(gameboard)
    }


    return {
        render,
        updateSquare,
        showBoard,
    }
})();

const Game = (() => {
    let players = [];
    let currPlayerIndex;
    const startGame = () => {
        players = [
            createPlayer(document.querySelector("#player-1").value, 'X'),
            createPlayer(document.querySelector("#player-2").value, 'O')
        ]

        Gameboard.render()
        currPlayerIndex = 0
    }

    const handleClick = (event) => {
        if(event.target.innerText == ''){
            Gameboard.updateSquare(event.target, players[currPlayerIndex].mark)
            currPlayerIndex = currPlayerIndex == 0 ? 1 : 0
        }
    }

    return {
        startGame,
        handleClick,
    }
})();

function createPlayer (name, mark) {
    return {
        name,
        mark
    }
}

Game.startGame()