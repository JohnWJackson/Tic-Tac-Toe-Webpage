const Player = (side) => {
  let turn = false;
  let playerSide = side;
  const getSide = () => playerSide;
  const isTurn = () => turn;
  const startTurn = () => { turn = true };
  const finishedTurn = () => { turn = false };
  const resetPlayer = () => { turn = false; playerSide = '';}
  return {getSide, isTurn, startTurn, finishedTurn, resetPlayer}
};

const gameBoard = (() => {

  let board = { 'A1': '', 'A2': '', 'A3': '', 
                'B1': '', 'B2': '', 'B3': '', 
                'C1': '', 'C2': '', 'C3': ''  }

  // Clear board and initialize
  const newBoard = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => {
      sq.textContent = '';
    });
  }

  // Stores the board state after a turn
  const checkIfWinner = (square) => {
        let winConditions = { 'row_1' : 0, 'row_2' : 0, 'row_3' : 0,
                          'column_1' : 0, 'column_2': 0, 'column_3': 0,
                          'diaganol_1' : 0, 'diaganol_2' : 0 }
    
    for (i = 0; i < Object.keys(board).length; i++) {
      if (Object.values(board)[i] == Player.getSide()) {
        switch (Object.keys(board)[i]) {
          case 'A1': winConditions['row_1']++;
                     winConditions['column_1']++;
                     winConditions['diaganol_1']++;
                     
                     break;
          case 'A2': winConditions['row_1']++;
                     winConditions['column_2']++;
                     break;
          case 'A3': winConditions['row_1']++;
                     winConditions['column_3']++;
                     winConditions['diaganol_2']++;
                     break;
          case 'B1': winConditions['row_2']++;
                     winConditions['column_1']++;
                     break;
          case 'B2': winConditions['row_2']++;
                     winConditions['column_2']++;
                     winConditions['diaganol_1']++;
                     winConditions['diaganol_2']++;
                     break;
          case 'B3': winConditions['row_2']++;
                     winConditions['column_3']++;
                     break;
          case 'C1': winConditions['row_3']++;
                     winConditions['column_1']++;
                     winConditions['diaganol_2']++;
                     break;
          case 'C2': winConditions['row_3']++;
                     winConditions['column_2']++;
                     break;
          case 'C3': winConditions['row_3']++;
                     winConditions['column_3']++;
                     winConditions['diaganol_1']++;
                     break;
        }
      }
    }
  }

  // Event listeners and perform actions when board clicked
  const boardListen = (Player) => {
    //Event listeners on game squares
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => {
      sq.addEventListener('click', function() {
        if (isValid(sq)) {
          placeMove(sq, Player);
          if (isWinner(Player)) {
            console.log("WINNER");

          }
        //   updateGame();
        // }
        // if 3 in a row declare winner
        // if whole board is full and no winner declare tie;
        // draw a line through winning 3
        // endGame(); freezes board until reinitalized
        }
      });
    });
  }

  const isWinner = (Player) => {
    let winConditions = { 'row_1' : 0, 'row_2' : 0, 'row_3' : 0,
                          'column_1' : 0, 'column_2': 0, 'column_3': 0,
                          'diaganol_1' : 0, 'diaganol_2' : 0 }
    
    for (i = 0; i < Object.keys(board).length; i++) {
      if (Object.values(board)[i] == Player.getSide()) {
        switch (Object.keys(board)[i]) {
          case 'A1': winConditions['row_1']++;
                     winConditions['column_1']++;
                     winConditions['diaganol_1']++;
                     
                     break;
          case 'A2': winConditions['row_1']++;
                     winConditions['column_2']++;
                     break;
          case 'A3': winConditions['row_1']++;
                     winConditions['column_3']++;
                     winConditions['diaganol_2']++;
                     break;
          case 'B1': winConditions['row_2']++;
                     winConditions['column_1']++;
                     break;
          case 'B2': winConditions['row_2']++;
                     winConditions['column_2']++;
                     winConditions['diaganol_1']++;
                     winConditions['diaganol_2']++;
                     break;
          case 'B3': winConditions['row_2']++;
                     winConditions['column_3']++;
                     break;
          case 'C1': winConditions['row_3']++;
                     winConditions['column_1']++;
                     winConditions['diaganol_2']++;
                     break;
          case 'C2': winConditions['row_3']++;
                     winConditions['column_2']++;
                     break;
          case 'C3': winConditions['row_3']++;
                     winConditions['column_3']++;
                     winConditions['diaganol_1']++;
                     break;
        }
      }
    }
    
    for (i = 0; i < Object.keys(winConditions).length; i++) {
      console.log(Object.values(winConditions)[i]);
      if (Object.values(winConditions)[i] == 3) {
        return true;
      }
    }
    return false;
  }

  // Checks if a square is a valid move
  const isValid = (square) => {
    return square.textContent.length == 0; // valid square if theres no content already there
  }

  // Places a move on the board and stores it
  const placeMove = (square, Player) => {
    board[square.dataset.key] = Player.getSide();
    return square.textContent = Player.getSide();   
  }

  return {boardListen}
})();

const game = (() => {
  const initGame = () => {
    const player1 = Player('X')
    const player2 = Player('O');
    const round = gameBoard.boardListen(player1);   
  };

  const newBoard = (board) => {
    //Event listeners on new game button
    const resetButton = document.querySelector('#new_game');
    resetButton.addEventListener('click', function() {
      board.newBoard();
    });
  }

  //occurs when click new game button
  //make Players
  //Player 1 choose 'X' or 'O'
  //make gameBoard
  //Player 1 turn
  //Players take turn till winner declared
  return {initGame}
})();
 


//const player1 = Player('X');
//console.log(player1.isTurn());
//player1.startTurn();
//console.log(player1.isTurn());
//const round = gameBoard.boardListen(player1);

const round = game.initGame();