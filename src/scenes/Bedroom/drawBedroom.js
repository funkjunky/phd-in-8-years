import getTexture from 'getTexture';
import { drawImage } from 'webglcanvas';

export default (ctx, state) => {
  drawImage(ctx, getTexture('room.png'), 0, 0, 640, 480);
};
