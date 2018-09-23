import { clear, drawText } from './webglcanvas';

// A fourth argument, dt could be used to fix lag if we wanted to get extra fancy.

let msSinceSecond = 0;
let frames = 0;
let lastFPS = 0;
export default (ctx, scenes, state, dt) =>  {
  //console.log('dt: ', dt);
  if ((msSinceSecond += dt) > 1000) {
    msSinceSecond -= 1000;
    lastFPS = frames;
    frames = 0;
  } else {
    ++frames;
  }

  clear(ctx);
  scenes.forEach(scene => {
    // TODO: i needs to be maintained between two arrays... ugly.
    // save/restore doesn't exist in webGL, so remove after adding webGL
    // It's needed here, because translate/rotate camera needs to be reset.
    ctx.save();
    scene.draw(ctx, state.scenes[scene.name], state);
    ctx.restore();
  });
  drawText(ctx, 'FPS: ' + lastFPS, 50, 50);
};
