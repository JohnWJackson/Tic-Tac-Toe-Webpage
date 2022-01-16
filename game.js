const Player = (side) => {
  let turn = false;
  let playerSide = side;
  let winner = false;
  const getSide = () => playerSide;
  const isTurn = () => turn;
  const startTurn = () => { turn = true };
  const finishedTurn = () => { turn = false };
  const resetPlayer = () => { turn = false; playerSide = '';}
  const getWinner = () => winner;
  const declareWinner = () => { winner = true; }
  const declareTie = () => { winner = null; }
  return { getSide, isTurn, 
            startTurn, finishedTurn, 
            resetPlayer, getWinner, 
            declareWinner, declareTie }
};

const gameBoard = (() => {

  let board = { 'A1': '', 'A2': '', 'A3': '', 
                'B1': '', 'B2': '', 'B3': '', 
                'C1': '', 'C2': '', 'C3': ''  }

  // Event listeners and perform actions when board clicked
  const boardListen = (Player1, Player2) => {
    //Event listeners on game squares
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => {
      sq.addEventListener('click', function() {
        const Player = Player1.isTurn() ? Player1 : Player2;
        console.log(Player);
        if (isValid(sq)) {
          placeMove(sq, Player);
          if (isTie()) {
            Player.declareTie();
            console.log("tie");
          }
          if (isWinner(Player)) {
            Player.declareWinner();
            console.log("WINNER");
          }
          switchTurn(Player1, Player2);
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

  const switchTurn = (Player1, Player2) => {
    if (Player1.isTurn() ? Player1.finishedTurn() : Player1.startTurn());
    if (Player2.isTurn() ? Player2.finishedTurn() : Player2.startTurn());
    //console.log(Player1.isTurn());
  }

  // Check if there is a winner
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
      //console.log(Object.values(winConditions)[i]);
      if (Object.values(winConditions)[i] == 3) {
        return true;
      }
    }
    return false;
  }

  const isBoardFull = () => {
    let total = 0;
    for (i = 0; i < 9; i++) {
      switch (Object.values(board)[i]) {
        case 'X': total++; break;
        case 'O': total++; break
      }
    }
    return total == 9 ? true : false;
  }

  // Check if there is a tie
  const isTie = () => {
    return isBoardFull();
  }

  // Checks if a square is a valid move
  const isValid = (square) => {
    return square.textContent.length == 0; // valid square if theres no content already there
  }

  // Places a move on the board and stores it
  const placeMove = (square, Player) => {
    board[square.dataset.key] = Player.getSide();
    //console.log(board[square.dataset.key]);
    return square.textContent = Player.getSide();   
  }

  return {boardListen, isBoardFull}
})();

const game = (() => {
  const initGame = () => {
    const player1 = Player('X');
    const player2 = Player('O');
    player1.startTurn();
    const round = gameBoard.boardListen(player1, player2);
    
  };

  const resetEvent = () => {
    //Event listeners on new game button
    const resetButton = document.querySelector('#new_game');
    resetButton.addEventListener('click', function() {
      resetBoard();
    });
  }

  // Clear board and initialize
  const resetBoard = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => {
      sq.textContent = '';
    });
  }

  return {initGame, resetEvent}
})();
 

const newGame = game.initGame();
const resetListener = game.resetEvent(newGame);