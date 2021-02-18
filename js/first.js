const canvas = document.getElementById("mycanvas");
let _w = window.innerWidth;
let _h = window.innerHeight;

const renderer = new PIXI.Renderer({
  backgroundColor: 0x1099bb,
  view: canvas,
  width: _w,
  height: _h,
  resolution: window.devicePixelRatio,
  autoDensity: true,
});

window.addEventListener("resize", resize);

function resize() {
  _w = window.innerWidth;
  _h = window.innerHeight;

  renderer.resize(_w, _h);
}

const stage = new PIXI.Container();

const texture = PIXI.Texture.from("../assets/ui/info_plate_big.png");
const img = new PIXI.Sprite(texture);

img.anchor.x = 0.5;
img.anchor.y = 0.5;
stage.addChild(img);

const ticker = new PIXI.Ticker();
ticker.add(animate);
ticker.start();

function animate() {
  img.x = renderer.screen.width / 2;
  img.y = renderer.screen.height / 2;
  renderer.render(stage);
}
