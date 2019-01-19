const moves = (state = [1, 2, 3], { type, column }) => {
  switch (type) {
    case 'ADD_NEW_MOVE':
      return [...state, column];
    default:
      return state;
  }
};

export default moves;
