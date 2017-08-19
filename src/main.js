require('../lib/ga.js');
require('../lib/custom.js');

import Paddle from './things/paddle';
import Ball from './things/ball';

const ga = window.ga;

const level1 = require('./levels/level-00');

var g = ga(
  768,
  768,
  () => {
    g.assets
    g.canvas.style.border = "2px black solid";
    g.canvas.style.display = "block";
    g.canvas.style.margin = "auto";
    g.backgroundColor = "white";
    g.collisionGroups = {
      balls: [],
      paddles: []
    };

    let thingIdIncrementor = 0;
    g.getAutoIncrementedId = () => {
      return thingIdIncrementor += 1;
    }

    const world = g.makeTiledWorld(level1, 'assets/tileset.png');
    world.visible = true;

    const paddle = new Paddle(g);
    const ball = new Ball(g);
    g.collisionGroups.balls.push(ball);
    g.collisionGroups.paddles.push(paddle);

    paddle.attachStarterBall(ball);

    g.state = () => {
      paddle.update();
      ball.update();
    };
  },
  [
    "assets/tileset.png",
  ]
);

g.start();
g.enableFullscreen();
