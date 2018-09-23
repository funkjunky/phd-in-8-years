export default class Scene {
  // Reducers initial State
  initialState = {};

  // When a key becomes pressed and no key above it is pressed.
  //{ space: () => actionCreator() }
  prioritizedKeys = null;

  _eventListeners = {};
  _keys = {};

  constructor(store, keys) {
    this._eventListeners = {};
    if (keys) this._initKeys(store, keys);
  }
  _initKeys(store, keys) {
    // If there is a default,then start it up!
    if (keys.default) {
      store.dispatch(keys.default());
    }

    window.addEventListener('keydown', ({ code }) => {
      // if any prioritized key before the pressed key, is already pressed, then abort [return true]
      // This means the currently held key supersedes the next key being pressed
      Object.entries(keys).find(([prioritizedKey, actionCreator]) => {
        if (this._keys[prioritizedKey]) return true;
        if (code === prioritizedKey) {
          store.dispatch(actionCreator());
          return true;
        }
        return false;
      });
      this._keys[code] = true;
    });
    window.addEventListener('keyup', ({ code }) => {
      // Find the next key that is still pressed, and dispatch that action.
      const found = Object.entries(keys).find(([prioritizedKey, actionCreator]) => {
        if (code !== prioritizedKey && this._keys[prioritizedKey]) {
          console.log('here?');
          store.dispatch(actionCreator());
          return true;
        } else return false;
      });
      // if there is a default to fallback on, dispatch it.
      if (!found && this._keys[code]) {
        if(keys.default) store.dispatch(keys.default());
      }
      this._keys[code] = false;
    });
  }
  addEventListener(event, fnc) {
    this._eventListeners[event] = fnc;
    window.addEventListener(event, fnc);
    return () => window.removeEventListener(event, fnc);
  }
  unload() {
    Object.entries(([event, fnc]) => window.removeEventListener(event, fnc));
  }

  draw(ctx, sceneState, globalState) {
  }
  getReducer() {
  }
}
