const moves = (state = [0, 0, 3, 2], { type, column }) => {
  switch (type) {
    case 'ADD_NEW_MOVE':
      return [...state, column];
    default:
      return state;
  }
};

export default moves;
