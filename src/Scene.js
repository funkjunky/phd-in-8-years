export default class Scene {
  // Reducers initial State
  initialState = {};

  // When a key becomes pressed and no key above it is pressed.
  //{ space: () => actionCreator() }
  prioritizedKeys = null;

  _eventListeners = {};
  _keys = {};

  constructor(store) {
    this._eventListeners = {};
    this._initKeys(store);
  }
  _initKeys(store) {
    if (this.prioritizedKeys) {
      window.addEventListener('keydown', ({ key }) =>
        this._keys[key] = true;

        // if any prioritized key before the pressed key, is already pressed, then abort [return true]
        // This means the currently held key supersedes the next key being pressed
        Object.entries(this.prioritizedKeys).find([prioritizedKey, actionCreator] => {
          if (this._keys[prioritizedKey]) return true;
          if (key === k) {
            store.dispatch(actionCreator());
            return true;
          }
        });
      );
      window.addEventListener('keyup', ({ key }) =>
        this._keys[key] = false;

        // Find the next key that is still pressed, and dispatch that action.
        Object.entries(this.prioritizedKeys).find([prioritizedKey, actionCreator] => {
          if (this._keys[prioritizedKey]) {
            store.dispatch(actionCreator());
            return true;
          }
        });
      );
    }
  }
  addEventListener(event, fnc) {
    this._eventListeners[event] = fnc;
    window.addEventListener(event, fnc);
    return () => window.removeEventListener(event, fnc);
  }
  unload() {
    Object.entries([event, fnc] => window.removeEventListener(event, fnc));
  }

  draw(ctx, sceneState, globalState) {
  }
  getReducer() {
  }
}
