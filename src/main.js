require('../lib/ga.js');
require('../lib/custom.js');

import Paddle from './sprites/paddle';
import Ball from './sprites/ball';

const ga = window.ga;

const level1 = require('./levels/level-00');

var g = ga(
  768,
  768,
  () => {
    g.assets
    g.canvas.style.border = "1px black dashed";
    g.canvas.style.display = "block";
    g.canvas.style.margin = "auto";
    g.backgroundColor = "white";
    g.sprites = {};
    const world = g.makeTiledWorld(level1, 'assets/tileset.png');
    world.visible = true;

    const player1 =  new Paddle(g);
    const ball1 = new Ball(g);

    g.state = () => {
      player1.update();
      ball1.update();
    };
  },
  [
    "assets/tileset.png",
  ]
);

console.log('about to start');
g.start();
