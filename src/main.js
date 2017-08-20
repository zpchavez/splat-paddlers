require('../lib/ga.js');
require('../lib/custom.js');

import Paddle from './things/paddle';
import Ball from './things/ball';
import Block from './things/block';

const ga = window.ga;

var g = ga(
  768,
  768,
  () => {
    g.canvas.style.border = "2px black solid";
    g.canvas.style.display = "block";
    g.canvas.style.margin = "auto";
    g.backgroundColor = "white";
    g.collisionGroups = {
      balls: [],
      paddles: [],
      blocks: [],
    };

    let thingIdIncrementor = 0;
    g.getAutoIncrementedId = () => {
      return thingIdIncrementor += 1;
    }

    const blocks = [];
    for (let x = 128; x <= 608; x += 32) {
      for (let y = 128; y <= 608; y += 32) {
        blocks.push(new Block(g, { x, y }));
      }
    }
    g.collisionGroups.blocks = blocks;

    const paddle = new Paddle(g, { player: 1, position: 'bottom', color: 'red' });
    const ball = new Ball(g, 'red');
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
