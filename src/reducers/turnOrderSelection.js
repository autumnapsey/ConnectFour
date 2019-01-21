const turnOrderSelection = (state = 0, { type, selection }) => {
  switch (type) {
    case 'SELECT_TURN_ORDER':
      return selection;
    case 'RESET_TURN_ORDER_SELECTION':
      return 0;
    default:
      return state;
  }
};

export default turnOrderSelection;
