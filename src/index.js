import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { createYieldEffectMiddleware } from 'redux-yield-effect';
import { addTick } from 'effect-tick';
import { tickMiddleware, resumeTicks, pauseTicks } from 'effect-tick';

import reducer from './reducer';
import graphics from './graphics';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('root');

    const store = createStore(
        reducer,
        applyMiddleware(
            createYieldEffectMiddleware(),
            tickMiddleware,
            metaSelector
        ),
    );
    store.dispatch(resumeTicks());

    let ctx = canvas.getContext('2d');
    const step = dt => {
        graphics(ctx, store.getState(), dt);
        window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);

});

registerServiceWorker();
