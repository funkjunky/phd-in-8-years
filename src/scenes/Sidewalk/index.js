import Scene from '/Scene';
import player, { strafeRight, strafeLeft, brace, straight } from './player';
import weather, { setWeather } from './weather';
import drawPlayer from './player/drawPlayer';

export default class Sidewalk extends Scene {
  constructor(store) {
    this.super(store);

    const state = store.getState();
    if (state.game.month >= 12 || state.game.month <= 4) {
      store.dispatch(setWeather([
        'blizzard',
        'snowing',
        'sunnysnow',
      ][Math.floor(Math.random() * 3)])
    } else {
      store.dispatch(setWeather([
        'storming',
        'raining',
        state.game.month >= 9 && state.game.month <= 11
          ? 'fall'
          : 'summer',
      ][Math.floor(Math.random() * 3)])
    }
  }

  getReducer => combineReducers({
    player,
    weather,
  });

  prioritizedKeys = {
    Space: () => brace(),
    ArrowRight: () => strafeRight(),
    ArrowLeft: () => strafeLeft(),
    default: () => straight(),
  };

  draw = (ctx, state, globalState) => {
    drawPlayer(ctx, state.player, state.weather);
    drawWeather(ctx, state.weather);
  };
}
