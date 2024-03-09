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

    const showBoard = () => {
        return gameboard
    }

    const resetBoard = () => {
        gameboard = ['','','','','','','','',''];
    }

    return {
        render,
        updateSquare,
        showBoard,
        resetBoard,
    }
})();

const Game = (() => {
    let players = [];
    let currPlayerIndex;
    let gameOver = false
    const startGame = () => {
        players = [
            createPlayer(document.querySelector("#player-1").value, 'X'),
            createPlayer(document.querySelector("#player-2").value, 'O')
        ]
        Gameboard.render()
        currPlayerIndex = 0
    }

    const handleClick = (event) => {
        if (!gameOver){
            // If the square is empty the player move is valid.
            if(event.target.innerText == ''){
                // Update gameboard
                Gameboard.updateSquare(event.target, players[currPlayerIndex].mark)

                // Check for win and tie conditions
                checkgameEnd = checkWin(Gameboard.showBoard());
                if (checkgameEnd == 'tie'){
                    gameOver = true
                    document.querySelector('.game-end-message').innerText = ("It's a tie!")
                } else if (checkgameEnd){
                    gameOver = true
                    document.querySelector('.game-end-message').innerText = (`${players[currPlayerIndex].name} won the game!`)
                }

                // Switch players
                currPlayerIndex = currPlayerIndex == 0 ? 1 : 0
            }
        }
    }

    const restart = () => {
    
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.innerHTML = ''
        })
        document.querySelector('.game-end-message').innerText = ''
        gameOver = false
        currPlayerIndex = 0
        Gameboard.resetBoard()
    }

    return {
        startGame,
        handleClick,
        restart,
    }
})();

function createPlayer (name, mark) {
    return {
        name,
        mark
    }
}

function checkWin(board){
    const winningOptions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningOptions.length; i++) {
        const [a, b, c] = winningOptions[i];
        if (board[a] != '' && board[a] == board[b] && board[b] == board[c]) {
            return true
        }
    }
    if (board.every(element => element == 'X' || element == 'O')){
        return 'tie'
    }
}



document.querySelector(".restart-game").addEventListener('click', Game.restart);
document.querySelector(".start-game").addEventListener('click', Game.startGame)