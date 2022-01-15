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

  const storeBoard = (square) => {

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
    // console.log(Player.getSide());

    // let placedSquares = [['row1', 0], ['row2', 0], ['row3', 0], 
    //                     ['column1', 0], ['column2', 0], ['column3', 0],
    //                     ['diagonal1', 0], ['diagonal2', 0]];
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => {
      // console.log(Player.getSide());
      // if (sq.textContent == Player.side) {
      //   placedSquares.push(sq.dataset.key);
      //   switch (sq.dataset.key) {
      //     case 'A1': placedSquares[0][1]++;
          // case 'A2': a++ two ++;
          // case 'A3': a++ three++;
          // case 'B1': b++ one++;
          // case 'B2': b++ two++;
          // case 'B3': b++ three++;
          // case 'C1': c++ one++;
          // case 'C2': c++ two++;
          // case 'C3': c++ three++;
        // }
        //console.log(placedSquares[0][1]);
      // }
    })
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