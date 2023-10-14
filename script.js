let player1 = "X";
let player2 = "O";

let person1 = prompt("");
let person2 = prompt("");

document.getElementById("person1").innerHTML = ` <strong>Player1(X):</strong> ${person1}  `;
document.getElementById("person2").innerHTML = ` <strong>Player2(O):</strong> ${person2}  `;


//player1 = "X";
//player2 = "O";

let activePlayer = player1;
// function to setup game board
const gameBoard = (() => {
    // game board array
    let board = [
        "","","",
        "","","",
        "","",""
    ];
    

    //print the status gameBoard.makeBoard()
    let makeBoard = () => board;

    //Select all the nodes in board array
    let spots = document.querySelectorAll(".gameSquare")

    //render the board array to node of spots
    let render = function (board, spots) {
        for (let i = 0; i < board.length; i++) {
            spots[i].innerHTML = board[i];
        }
    };
    render(board, spots)

    // clears the board but not the display
    let clearBoard = () => {
        for (letters in board) {
            board[letters] = "";
    }

    for (let i = 0; i < board.length; i++) {
        spots[i].innerHTML = "";
            }

};

    return {
        board,
        makeBoard,
        render,
        clearBoard,
    }

})();




// controls the flow of game
const gameController = (() => {

    //button variables
    let playBtn = document.getElementById("play");
    let resetBtn = document.getElementById("reset");

    // object nodes of game cells
    let gameCells = document.querySelectorAll(".gameSquare")
    //console.log(gameCells)
    //console.log(gameCells[0])
    let status = gameBoard.makeBoard()
    //console.log(status)
    //console.log(activePlayer)

    //(is this condition true) ? (then do this) : (else do this)
    let changeTurn = () => {
        activePlayer = activePlayer == player1 ? player2 : player1;
    }

    

    // function to pick cell mark cell html and 
    // checkWin here checks on clicks

    let pickCell = (event) => {
        //console.log(gameBoard.board)
        //console.log(event)
        //console.log(event.target.id)
        let myTag = event.target.id
        event.target.innerHTML = activePlayer;
        gameBoard.board[myTag] = activePlayer;
        checkWin()
        //console.log(gameBoard.board)
        
    }


    let checkDraw = () => {
        let currentBoard = gameBoard.makeBoard();  
        let counter = 0
        currentBoard.forEach((spot, index) => {
            if (currentBoard[index] !== ""){
                counter++
                //console.log(counter)
            }
        });
        //console.log(currentBoard);
        if (counter === 8) {
            console.log("draw")
            return true;
        }
    }



    // checks winner by matching the array cond.
    // with the 3 indexes in loop that match
    // cycles through each and matches 
    const checkWin = () => {
        let currentBoard = gameBoard.makeBoard();
        //console.log(currentBoard)

        // works via indexes
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        //let roundWin = false; maybe put back if break
        let roundWin = false;
        for (let i = 0; i < winningConditions.length; i++) {
            //console.log(i)
            
            const winCondition = winningConditions[i];
            //console.log(winCondition)
            let a = currentBoard[winCondition[0]];
            let b = currentBoard[winCondition[1]];
            let c = currentBoard[winCondition[2]];
            //console.log(a);
            //console.log(b);
            //console.log(c);

            if (a === '' || b === '' || c === '') {
                continue;
            } 

            if (a === b && b === c) {
                roundWin = true;
                if (activePlayer === "X"){
                console.log(person1 + " has won the match.")
                alert(person1 + " has won the match.")
                 } else{
                    console.log(person2 + " has won the match.")
                    alert(person2 + " has won the match.")
                 }
                let mess = ` ${activePlayer} is the winner `
                console.log(mess)
                break;
            }
        }         
    }

    // event listener that picks the cell and triggers funct
    let insertMark = () => {
        gameCells.forEach(function callback(value, index){
            //console.log(`${index}: ${value}`)
            //console.log(value)
            //console.log(index)
            value.addEventListener('click', pickCell)
            
        })
    }

    let play = (event) => {
        //console.log(event)
        let id = event.target.id
        //console.log(id)
        let boardStatus = gameBoard.board
        //console.log(boardStatus)
        if (id && boardStatus[id] === "") {
            gameController.insertMark();
            
            if(gameController.checkWin()) {
                gameController.resetGame()
            }
            if(gameController.checkDraw()){
                gameController.resetGame()
            }
            else {
                gameController.changeTurn();
            }
        }
    }


    // LAST PART TO CODE
    let playGame = () => {
        gameCells.forEach(function callback(value, index){
            value.addEventListener('click', play)
        })
    }

    let resetGame = () => {
        for (letters in gameBoard.board){
            gameBoard.board[letters] = "";
        }

        let spots = document.querySelectorAll(".gameSquare")
        for (let i = 0; i < gameBoard.board.length; i++) {
            spots[i].innerHTML = "";
                }
    }
    
        resetBtn.addEventListener("click", resetGame)
        playBtn.addEventListener("click", playGame)

    return {
        
        status,
        gameCells,
        checkDraw,
        changeTurn,
        insertMark,
        playGame,
        checkWin,
        resetGame,
    }

})()
