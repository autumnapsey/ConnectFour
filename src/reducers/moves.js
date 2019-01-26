const moves = (state = [], { type, column, computerMove }) => {
  switch (type) {
    case 'ADD_COMPUTER_MOVE':
      return computerMove;
    case 'ADD_PLAYER_MOVE':
      return [...state, column];
    default:
      return state;
  }
};

export default moves;
