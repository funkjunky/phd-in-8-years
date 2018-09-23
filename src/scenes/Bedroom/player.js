const initialState = {
  bumps: 0
};

export const bumpAwake = () => ({
  type: 'BUMP_AWAKE',
});

export default (state = initialState, action) => {
  switch(action.type) {
    case 'BUMP_AWAKE':
      return {
        ...state,
        bumps: ++state.bumps,
      };
    default:
      return state;
  }
}
