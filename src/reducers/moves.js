const moves = (state = [], { type, column }) => {
  switch (type) {
    case 'ADD_NEW_MOVE':
      return [...state, column];
    default:
      return state;
  }
};

export default moves;
