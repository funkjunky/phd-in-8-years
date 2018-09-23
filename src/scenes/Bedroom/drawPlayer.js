import getTexture from 'getTexture';
import { drawImage } from 'webglcanvas';

export default ctx => drawImage(ctx, getTexture('player.png'), 100, 100, 64, 64);
