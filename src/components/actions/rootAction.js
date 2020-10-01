const countAction = () => {
  dispatch({
    type: "INCREMENT",
    payload: itemTotal(),
  });
};
