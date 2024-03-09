// Storing gameboard as an array inside of a Gameboard Object
// Players will also be stored in objects
// Object to control the flow of the game

const Gameboard = (() => {
    let gameboard = ['','','','','','','','',''];

    const render = () => {
        let boardGameHTML = '';
        gameboard.forEach((square, idx) => {
            boardGameHTML += `<div class="square" id=square-${idx}>${square}</div>`;
        })
        document.querySelector(".game-board").innerHTML = boardGameHTML;
    }
 
    return {
        render,
    }

})();

Gameboard.render()