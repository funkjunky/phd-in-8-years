import { combineReducers } from 'redux';

import Scene from 'Scene';
import player, { bumpAwake } from './player';
import drawPlayer from './drawPlayer';
import drawBedroom from './drawBedroom';
import { drawText } from 'webglcanvas';

export default class Bedroom extends Scene {
  name = 'bedroom';

  constructor(store) {
    super(store);
    // TODO: randomly generate a bedroom state.
    // ie. messy, clean, clean tucked sheets, messy sheets,
    // Perhaps increase the odds of it being messy as selfDeprecation increases
  }

  getReducer = () => combineReducers({
    player,
  });

  prioritizedKeys = {
    Space: () => bumpAwake(),
  };

  draw = (ctx, state, globalState) => {
    drawPlayer(ctx, state.player);
    drawBedroom(ctx, state.bedroom);
    drawText(ctx, 'Bedroom <insert date>', 100, 100);
  };
}
