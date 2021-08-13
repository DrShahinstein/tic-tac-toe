class Minimax {
  constructor(board, players) {
    this.board = board;
    const EMPTY = "";

    this.min = () => {
      const valueOfPosition = this.returnValueOfPosition();

      if (this.isFinished()) {
        return valueOfPosition;
      }

      let maxValue = Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === EMPTY) {
            this.board[i][j] = players.user;
            const bestValuesForComputer = this.max();

            if (bestValuesForComputer.point < maxValue) {
              maxValue = bestValuesForComputer.point;
            }
            this.board[i][j] = EMPTY;
          }
        }
      }

      return maxValue;
    };

    this.max = () => {
      const valueOfPosition = this.returnValueOfPosition();

      if (this.isFinished()) {
        return { point: valueOfPosition, row: -1, col: -1 };
      }

      let lowestValue = -Infinity;
      let bestRow = undefined;
      let bestCol = undefined;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === EMPTY) {
            this.board[i][j] = players.opponnent;
            const bestPointForUser = this.min();

            if (bestPointForUser > lowestValue) {
              lowestValue = bestPointForUser;
              bestRow = i;
              bestCol = j;
            }
            this.board[i][j] = EMPTY;
          }
        }
      }
      return {
        point: lowestValue,
        row: bestRow,
        col: bestCol,
      };
    };
    this.returnValueOfPosition = () => {
      for (let i = 0; i < 3; i++) {
        if (
          this.board[0][i] === this.board[1][i] &&
          this.board[1][i] === this.board[2][i] &&
          this.board[0][i] !== EMPTY
        ) {
          if (board[0][i] === players.user) return -1;
          else return 1;
        }
      }

      for (let i = 0; i < 3; i++) {
        if (
          this.board[i][0] === this.board[i][1] &&
          this.board[i][1] === this.board[i][2] &&
          this.board[i][0] !== EMPTY
        ) {
          if (board[i][0] === players.user) return -1;
          else return 1;
        }
      }

      if (
        this.board[0][0] === this.board[1][1] &&
        this.board[1][1] === this.board[2][2] &&
        this.board[0][0] !== EMPTY
      ) {
        if (board[0][0] === players.user) return -1;
        else return 1;
      }

      if (
        this.board[0][2] === this.board[1][1] &&
        this.board[1][1] === this.board[2][0] &&
        this.board[0][2] !== EMPTY
      ) {
        if (board[0][2] === players.user) return -1;
        else return 1;
      }
      return 0;
    };
    this.isFinished = () => {
      if (
        (!this.getDepth() && !this.returnValueOfPosition()) ||
        this.returnValueOfPosition()
      ) {
        return true;
      }
      return false;
    };
    this.getDepth = () => {
      let count = 0;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === EMPTY) count += 1;
        }
      }

      return count;
    };
  }
}

export default Minimax;
