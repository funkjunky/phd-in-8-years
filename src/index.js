import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createYieldEffectMiddleware } from 'redux-yield-effect';
import { addTick } from 'effect-tick';
import metaSelector from 'redux-meta-selector';
import { tickMiddleware, resumeTicks, pauseTicks } from 'effect-tick';

import game from './gameReducer';
import graphics from './graphics';
// TODO: I should be able to do absolute paths... I don't like using ./ unless it makes sense.
import Bedroom from 'scenes/Bedroom/index.js';
import Pause from 'scenes/Pause/index.js';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('root');

  const store = createStore(
    combineReducers({ game }),
    applyMiddleware(
      createYieldEffectMiddleware(),
      tickMiddleware,
      metaSelector
    ),
  );
  const scenes = [new Bedroom(store)];
  // TODO: is there a better way than updateReducers
  updateReducers(store, scenes);
  store.dispatch(resumeTicks());

  let ctx = canvas.getContext('2d');
  const step = dt => {
    graphics(ctx, scenes, store.getState(), dt);
    window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);

  const pauseGame = () => {
    scenes.push(new Pause(store));
    updateReducers(store, scenes);

    store.dispatch(pauseTicks());
  };

  window.addEventListener('keyup',
    ({ key }) => key === 'P' && pauseGame()
  );
});

const updateReducers = (store, scenes) => {
  const sceneReducers = {};
  scenes.forEach(({ name, getReducer }) => sceneReducers[name] = getReducer());
  store.replaceReducer(combineReducers({ game, scenes: combineReducers(sceneReducers) }));
};

const preloadImage = src => {
  let i = new Image();
  i.src = src;
};

registerServiceWorker();
