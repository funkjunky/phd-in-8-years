import produce from 'immer';

const initialState = {
  bumps: 0
};

export const bumpAwake = () => ({
  type: 'BUMP_AWAKE',
});

export default (state = initialState, action) => {
  switch(action.type) {
    case 'BUMP_AWAKE':
      return produce(state, draftState => {
        ++draftState.bumps;
        return draftState;
      });
    default:
      return state;
  }
}
