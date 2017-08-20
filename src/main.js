require('../lib/ga.js');
require('../lib/custom.js');

import Paddle from './things/paddle';
import Ball from './things/ball';
import Block from './things/block';

const ga = window.ga;

import penguin from './pixelart/penguin.png';
import musicNote from './pixelart/music-note.png';

const pixelArt = [
  penguin,
  musicNote
];

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
    let counter = 0;
    let art = pixelArt[g.randomInt(0, pixelArt.length - 1)];
    for (let x = 128; x <= 608; x += 32) {
      for (let y = 128; y <= 608; y += 32) {
        if (art[counter] !== null) {
          blocks.push(new Block(g, art[counter], { x, y }));
        }
        counter += 1;
      }
    }
    g.collisionGroups.blocks = blocks;

    [
      { position: 'bottom', color: 'blue', player: 1},
      { position: 'right', color: 'blue', player: 1},
      { position: 'top', color: 'red', player: 2},
      { position: 'left', color: 'red', player: 2},
    ].forEach(paddleOptions => {
      const paddle = new Paddle(g, paddleOptions);
      g.collisionGroups.paddles.push(paddle);
      if (['left', 'right'].indexOf(paddleOptions.position) > -1) {
        const ball = new Ball(g, paddleOptions.color);
        paddle.attachStarterBall(ball);
        g.collisionGroups.balls.push(ball);
      }
    })

    g.state = () => {
      g.things.forEach(thing => thing.update());
    };
  },
  [
    "assets/tileset.png",
  ]
);

g.start();
g.enableFullscreen();
