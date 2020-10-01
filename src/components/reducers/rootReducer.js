const initalState = {
  counter: [],
};

function rootReducer(state = initalState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: action.payload };
      break;
    default:
      return state;
  }
}
export default rootReducer;
