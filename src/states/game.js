import Paddle from '../things/paddle';
import Ball from '../things/ball';
import Block from '../things/block';
import Hud from '../things/hud';

import roundScoreState from '../states/round-score';

export default (g) => {
  g.things = [];
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

  [
    { position: 'bottom', color: 'blue', player: 1},
    { position: 'right', color: 'blue', player: 1},
    { position: 'top', color: 'red', player: 2},
    { position: 'left', color: 'red', player: 2},
  ].forEach(paddleOptions => {
    const paddle = new Paddle(g, paddleOptions);
    g.collisionGroups.paddles.push(paddle);
    if (['top', 'bottom'].indexOf(paddleOptions.position) > -1) {
      const ball = new Ball(g, paddleOptions.color);
      paddle.attachStarterBall(ball);
      g.collisionGroups.balls.push(ball);
    }
  })

  const hud = new Hud(g, { onTimerReachesZero: () => {
    g.state = roundScoreState(g);
  }});

  return () => {
    g.things.forEach(thing => thing.update());
  };
};
