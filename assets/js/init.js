let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

var heightWindow = window.innerHeight;
var width = 700;

let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle,
  Graphics = PIXI.Graphics,
  renderer = PIXI.autoDetectRenderer(width, heightWindow);

let game = new Application({ width: width, height: heightWindow });
game.renderer.backgroundColor = 0x061639;
game.renderer.autoRezise = true;
document.getElementById("juego").appendChild(game.view);

let main;
let enemies = [];
let speedEnemyGeneration = 100;
let infinityCount = 0;
let standartEnemySpeed = 1;
let enemySpeed = 1;
let mainSpeed = 4;

setup();
function setup(delta) {
  main = player();
  game.stage.addChild(main);

  let left = keyboard("ArrowLeft"),
    right = keyboard("ArrowRight");
  down = keyboard("ArrowDown");
  left.press = () => {
    main.vx = -mainSpeed;
    main.vy = 0;
  };
  left.release = () => {
    main.vx = 0;
    main.vy = 0;
  };
  right.press = () => {
    main.vx = mainSpeed;
    main.vy = 0;
  };
  right.release = () => {
    main.vx = 0;
    main.vy = 0;
  };
  down.press = () => {
    enemySpeed += 10;
    speedEnemyGeneration = 10;
  };
  down.release = () => {
    enemySpeed = standartEnemySpeed;
    speedEnemyGeneration = 100;
  };
  state = play;

  game.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta) {
  infinityCount++;
  if (infinityCount % speedEnemyGeneration == 0) {
    game.stage.addChild(boots());
  }
  for (let index = 1; index < enemies.length; index++) {
    enemies[index].vy = enemies[index].vy + enemySpeed;
    enemies[index].y = enemies[index].vy;
  }

  state(delta);
}

function play(delta) {
  main.x += main.vx;
  main.y += main.vy;

  for (let index = 1; index < enemies.length; index++) {
    if (hitTestRectangle(enemies[index], main)) {
      game.stop();
    } else {
    }
  }
}
