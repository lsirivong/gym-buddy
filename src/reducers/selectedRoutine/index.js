const selectedRoutine = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_ROUTINE':
      return action.id

    default:
      return state
  }
};

export default selectedRoutine

