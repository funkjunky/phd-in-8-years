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
      // If there is a default,then start it up!
      if (this.prioritizedKeys.default) {
        store.dispatch(this.prioritizedKeys.default());
      }

      window.addEventListener('keydown', ({ key }) => {
        this._keys[key] = true;

        // if any prioritized key before the pressed key, is already pressed, then abort [return true]
        // This means the currently held key supersedes the next key being pressed
        Object.entries(this.prioritizedKeys).find(([prioritizedKey, actionCreator]) => {
          if (this._keys[prioritizedKey]) return true;
          if (key === prioritizedKey) {
            store.dispatch(actionCreator());
            return true;
          }
          return false;
        });
      });
      window.addEventListener('keyup', ({ key }) => {
        // Find the next key that is still pressed, and dispatch that action.
        const found = Object.entries(this.prioritizedKeys).find(([prioritizedKey, actionCreator]) => {
          if (key !== prioritizedKey && this._keys[prioritizedKey]) {
            store.dispatch(actionCreator());
            return true;
          } else return false;
        });
        // if there is a default to fallback on, dispatch it.
        if (!found && this._keys[key]) {
          if(this.prioritizedKeys.default) store.dispatch(this.prioritizedKeys.default());
        }
        this._keys[key] = false;
      });
    }
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
