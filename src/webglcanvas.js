//~~ Agnostic 2D drawing library ~~//
//~  Functions:                   ~//
//~   rotateCamera                ~//
//~   translateCamera             ~//
//~   drawImage                   ~//
//~   drawFrame                   ~//
//~   clear                       ~//

// TODO: add transactions. So the camera can be put anywhere and it'll always be handled first.
//        If we add more features, this could help in other ways...
//        Then again... maybe once we've added webgl we won't need transactions anymore.

// Important Note:
//  In order for these functions to work even with context '2d'
//  the camera needs to be set before drawing.
//  With 3d this isn't necessary, hence the note.
//  IMO drawing anything needs to know where the camera is,
//  so you should make a habit of defining the camera before drawing the objects.

// rotating the visual point of reference. Remember this is 2d and '2d' context has no concept of a camera.
export const rotateCamera = (ctx, radians) => {
  ctx.rotate(-radians);
};

// translating the visual point of reference. Remember this is 2d and '2d' context has no concept of a camera.
export const translateCamera = (ctx, x, y) => {
  ctx.translate(-x, -y);
};

// Identical to drawImage, except last parameter, allows the image to be rotated, regardless of context.
// Note: I kept rotation at the back, so this resembles ctx.drawImage as much as possible.
export const drawImage = (ctx, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, rotation = 0) => {
  // TODO: do webgl stuff here instead.
  ctx.save();
  ctx.translate(dx + dWidth / 2, dy + dHeight / 2);
  ctx.rotate(rotation);
  ctx.translate(-dWidth / 2, dHeight / 2);
  if (typeof dx !== 'undefined') {
    ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  } else {
    ctx.drawImage(image, sx, sy, sWidth, sHeight);
  }
  ctx.restore();
};

// Given a definition of a "sprite" (the second argument)
// This is a convinience function for drawImage.
// It should lessen the arguments when calling drawImage given a source from a spritesheet.
// Note: rotation was put ahead of dWidth and dHeight, because it's more likely to be set than dWidth and dHeight.
export const drawFrame = (ctx, { image, sx, sy, sWidth, sHeight }, dx, dy, rotation, dWidth = sWidth, dHeight = sHeight) =>
  drawImage(ctx, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, rotation)

export const getFrames = (image, sWidth, sHeight, count=999999, startX = 0, startY = 0) => {
  let frames = [];
  let sx = startX;
  let sy = startY;
  while((!image.width || sx + sWidth <= image.width) && --count >= 0) {
    frames.push({ image, sx, sy, sWidth, sHeight });

    // shift one frame to the right.
    sx += sWidth;

    // if we're over the right margin, then move to the next row
    if (image.width && sx + sWidth > image.width) {
      sx = 0;
      sy += sHeight;
    }
  }

  return frames;
};

export const drawText = (ctx, text, x, y, colour='black') => {
  ctx.save();
  ctx.fillStyle = colour;
  ctx.fillText(text, x, y);
  ctx.restore();
}

export const fillRect = (ctx, x, y, width, height, colour='black') => {
  ctx.save();
  ctx.fillStyle = colour;
  ctx.fillRect(x, y, width, height);
  ctx.restore();
}

// clearRect is silly, so I have an argumentless clear.
export const clear = (ctx) => {
  // TODO: webgl
  ctx.clearRect(0, 0, 10000, 10000);
};
