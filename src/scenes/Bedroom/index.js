import { combineReducers } from 'redux';

import Scene from 'Scene';
import player, { bumpAwake } from './player';
import drawPlayer from './drawPlayer';
import drawBedroom from './drawBedroom';
import { drawText } from 'webglcanvas';

export default class Bedroom extends Scene {
  name = 'bedroom';

  constructor(store) {
    super(store, {
      Space: () => bumpAwake(),
    });
    // TODO: randomly generate a bedroom state.
    // ie. messy, clean, clean tucked sheets, messy sheets,
    // Perhaps increase the odds of it being messy as selfDeprecation increases
  }

  getReducer = () => combineReducers({
    player,
  });

  draw = (ctx, state, globalState) => {
    drawBedroom(ctx, state.bedroom);
    drawPlayer(ctx, state.player);
    drawText(ctx, 'Bedroom <insert date>', 100, 100);
  };
}
