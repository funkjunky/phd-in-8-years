import { clear } from './webglcanvas';

// A third argument, dt could be used to fix lag if we wanted to get extra fancy.

export default (ctx, scenes, state) =>  {
  clear(ctx);
  scenes.forEach(scene => {
    // TODO: i needs to be maintained between two arrays... ugly.
    // save/restore doesn't exist in webGL, so remove after adding webGL
    // It's needed here, because translate/rotate camera needs to be reset.
    ctx.save();
    scene.draw(ctx, state.scenes[scene.name], state);
    ctx.restore();
  });
};
