import Ball from '../things/ball';
import Block from '../things/block';
import Hud from '../things/hud';
import Paddle from '../things/paddle';
import Pit from '../things/pit';

import roundScoreState from '../states/round-score';

export default (g) => {
  g.things = [];
  g.collisionGroups = {};

  const blocks = [];
  for (let x = 128; x <= 608; x += 32) {
    for (let y = 128; y <= 608; y += 32) {
      blocks.push(new Block(g, { x, y }));
    }
  }

  let paddleInfo = [];
  if (g.globals.players === 2 || g.globals.teams) {
    paddleInfo = [
      {position: 'bottom', color: 'blue'},
      {position: 'right', color: 'blue'},
      {position: 'top', color: 'red'},
      {position: 'left', color: 'red'},
    ];
    if (g.globals.players === 2) {
      paddleInfo[0].player = 1;
      paddleInfo[1].player = 1;
      paddleInfo[2].player = 2;
      paddleInfo[3].player = 2;
    } else if (g.globals.teams) {
      paddleInfo[0].player = 1;
      paddleInfo[1].player = 2;
      paddleInfo[2].player = 3;
      paddleInfo[3].player = 4;
    }
    paddleInfo[g.randomInt(0, 1)].startWithBall = true;
    paddleInfo[g.randomInt(2, 3)].startWithBall = true;
  } else if (g.globals.players === 4) {
    paddleInfo = [
      {position: 'bottom', color: 'blue', player: 1, startWithBall: true},
      {position: 'right', color: 'red', player: 2, startWithBall: true},
      {position: 'top', color: 'yellow', player: 3, startWithBall: true},
      {position: 'left', color: 'green', player: 4, startWithBall: true},
    ];
  }

  paddleInfo.forEach(paddleOptions => {
    const paddle = new Paddle(g, paddleOptions);
    if (paddleOptions.startWithBall) {
      const ball = new Ball(g, paddleOptions.color);
      paddle.attachStarterBall(ball);
    }
  })

  const hud = new Hud(g, { onTimerReachesZero: () => {
    g.state = roundScoreState(g);
  }});

  new Pit(g, 'TOP LEFT');
  new Pit(g, 'TOP RIGHT');
  new Pit(g, 'BOTTOM LEFT');
  new Pit(g, 'BOTTOM RIGHT');

  return () => {
    g.things.forEach(thing => thing.update());
  };
};
