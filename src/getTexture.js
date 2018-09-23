export default src => {
  let img = new Image();
  img.src = './textures/' + src;

  return img;
};
