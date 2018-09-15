const initialState = {
  month: 9,
  day: 1,
  year: 0,

  money: 100, //TODO: if money ever goes below 100, just make up something, like borrow money from parents, expirements, sell a kidney
  happiness: 100,
  selfDeprecation: 0,
};

export default (state, action) => {
  switch(action.type) {
    default:
      return state;
  }
};
