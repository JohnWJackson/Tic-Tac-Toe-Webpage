const Player = (side, id) => {
  let turn = false;
  let playerSide = side;
  let winner = false;
  const setSide = () => {
    const container = document.querySelector('#player' + id);
    container.dataset.side = playerSide;
  }
  const getSide = () => playerSide;
  const isTurn = () => turn;
  const startTurn = () => { turn = true };
  const finishedTurn = () => { turn = false };
  const getWinner = () => winner;
  const declareWinner = () => { winner = true; }
  const declareTie = () => { winner = null; }
  const resetPlayer = () => {
    winner = false;
    turn = false;
  }

  setSide();

  return { getSide, isTurn, 
            startTurn, finishedTurn, 
            getWinner, declareWinner, 
            declareTie, resetPlayer }
};

const gameBoard = (() => {

  let board = { 'A1': '', 'A2': '', 'A3': '', 
                'B1': '', 'B2': '', 'B3': '', 
                'C1': '', 'C2': '', 'C3': ''  }

  // Event listeners and perform actions when board clicked
  const boardListen = (Player1, Player2) => {
    //Event listeners on game squares
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => { // Listen for mouseover
      sq.addEventListener('mouseover', function() {
        if (sq.id != 'clicked') {
          const Player = Player1.isTurn() ? Player1 : Player2; // Which player?
          sq.id = 'hover';
          sq.textContent = Player.getSide();
        }
      });
      sq.addEventListener('mouseout', function() { // Listen for mouseout
        if (sq.id == 'hover') {
          const Player = Player1.isTurn() ? Player1 : Player2; // Which player?
          sq.removeAttribute('id');
          sq.textContent = '';
        }
      });
      sq.addEventListener('click', function() { // Listen for mouse clicks
        updateBoard(Player1, Player2, sq); // player made a move -- updateboard
      });
    });
  }

  const switchTurn = (Player1, Player2) => {
    if (Player1.isTurn() ? Player1.finishedTurn() : Player1.startTurn());
    if (Player2.isTurn() ? Player2.finishedTurn() : Player2.startTurn());
    highlightTurn(Player1, Player2);
  }

  // Check if there is a winner
  const isWinner = (Player) => {
    const winConditions = [ ['row_1', 0], ['row_2', 0], ['row_3', 0],
                          ['column_1', 0], ['column_2', 0], ['column_3', 0],
                          ['diaganol_1', 0], ['diaganol_2', 0] ]
                          
    for (i = 0; i < winConditions.length; i++) {
      winConditions[i][1] = 0;
    }

    // Map all squares into array of win conditions
    for (i = 0; i < 9; i++) {
      if (Object.values(board)[i] == Player.getSide()) {
        switch (Object.keys(board)[i]) {
          case 'A1': winConditions[0][1]++;
                     winConditions[3][1]++;
                     winConditions[6][1]++;                    
                     break;
          case 'A2': winConditions[0][1]++;
                     winConditions[4][1]++;
                     break;
          case 'A3': winConditions[0][1]++;
                     winConditions[5][1]++;
                     winConditions[7][1]++;
                     break;
          case 'B1': winConditions[1][1]++;
                     winConditions[3][1]++;
                     break;
          case 'B2': winConditions[1][1]++;
                     winConditions[4][1]++;
                     winConditions[6][1]++;
                     winConditions[7][1]++;
                     break;
          case 'B3': winConditions[1][1]++;
                     winConditions[5][1]++;
                     break;
          case 'C1': winConditions[2][1]++;
                     winConditions[3][1]++;
                     winConditions[7][1]++;
                     break;
          case 'C2': winConditions[2][1]++;
                     winConditions[4][1]++;
                     break;
          case 'C3': winConditions[2][1]++;
                     winConditions[5][1]++;
                     winConditions[6][1]++;
                     break;
        }
      }
    }

    // Find the win condition if there is one
    for (i = 0; i < winConditions.length; i++) {
      if (winConditions[i][1] == 3) {
        let squares;
        switch (winConditions[i][0]) {
            case 'row_1': 
              squares = document.querySelectorAll('.row_1');
              break;
            case 'row_2': 
              squares = document.querySelectorAll('.row_2');
              break;
            case 'row_3':
              squares = document.querySelectorAll('.row_3');
              break;
            case 'column_1':
              squares = document.querySelectorAll('.column_1');
              break;
            case 'column_2':
              squares = document.querySelectorAll('.column_2');
              break;
            case 'column_3':
              squares = document.querySelectorAll('.column_3');
              break;
            case 'diaganol_1':
              squares = document.querySelectorAll('.diaganol_1');
              break;
            case 'diaganol_2':
              squares = document.querySelectorAll('.diaganol_2');
              break;
        }

        // Give class attribute "#winner" to each winning square
        // Highlighting each square
        squares.forEach(square => { 
          square.classList += ' flash';
        });

        return true; //if there was a win condition
      }
    }
    return false; //there wasn't a win condition
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
    if (isBoardFull()) {
      squares = document.querySelectorAll('.square');
      squares.forEach(square => { 
        square.classList += ' flash';
      });
      return true;
    }
    return false;
  }

  // Checks if a square is a valid move
  const isValid = (square) => {
    return square.id != 'clicked'; // valid square if it was never clicked before
  }

  // Places a move on the board and stores it
  const placeMove = (square, Player) => {
    square.removeAttribute('id');
    square.id = 'clicked';
    board[square.dataset.key] = Player.getSide();
    //console.log(board[square.dataset.key]);
    return square.textContent = Player.getSide();   
  }

  const highlightTurn = (Player1, Player2) => {
    if (Player1.isTurn()) {
      const container = document.querySelector('#player1');
      container.className = 'highlight';
      const containerTwo = document.querySelector('#player2');
      containerTwo.className = 'player_container';

    }
    if (Player2.isTurn()) {
      const container = document.querySelector('#player2');
      container.className = 'highlight';
      const containerTwo = document.querySelector('#player1');
      containerTwo.className = 'player_container';
    }


    // const sides = document.querySelectorAll('.side');
    // sides.forEach(s => {
    //   if (Player.getSide() == s.textContent) {
    //     if (s.textContent == 'X')
    //     const container = document.querySelector()
    //   }
    // });  
  }

  const updateBoard = (Player1, Player2, square) => {
    const Player = Player1.isTurn() ? Player1 : Player2; // Which player?
    if (isValid(square)) { // If valid move
      placeMove(square, Player);
      if (isTie()) {
        Player.declareTie();
        console.log("tie");
      }
      if (isWinner(Player)) {
        Player.declareWinner();
        console.log("WINNER");
      }
      switchTurn(Player1, Player2);
    }
  }

  const resetEvent = (Player1, Player2) => {
    //Event listeners on new game button
    const resetButton = document.querySelector('#new_game');
    resetButton.addEventListener('click', function() {
      resetBoard();
      Player1.resetPlayer();
      Player2.resetPlayer();
      Player1.startTurn();
      highlightTurn(Player1, Player2);  
    });
  }

  // Clear board and initialize
  const resetBoard = () => {
    // reset js board
    for(var key in board) {
      board[key] = 0;
    }
    // reset the html/css
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => {
      sq.textContent = '';
      sq.removeAttribute('id');
      sq.classList.remove('flash');
    });
  }

  return {boardListen, isBoardFull, highlightTurn, resetEvent}
})();

const game = (() => {
  const initGame = () => {
    let player1 = Player('X', 1);
    let player2 = Player('O', 2);
    player1.resetPlayer();
    player2.resetPlayer();
    player1.startTurn();
    gameBoard.highlightTurn(player1, player2);
    const round = gameBoard.boardListen(player1, player2);
    gameBoard.resetEvent(player1, player2);
  };

  return {initGame}
})();

const newGame = game.initGame();
