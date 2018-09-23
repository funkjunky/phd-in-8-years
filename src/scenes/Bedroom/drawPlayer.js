import getTexture from 'getTexture';
import { drawFrame, getFrames } from 'webglcanvas';

const playerFrames = getFrames(getTexture('player.png'), 64, 64, 2);
export default (ctx, state) => drawFrame(ctx, playerFrames[state.bumps % 2], 100, 100);
