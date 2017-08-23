import TextUtil from '../text-util';
import gameState from './game';
import { getPlayerControls } from '../controls';

module.exports = (g) => {
  let score = {};
  g.collisionGroups.paddles.forEach(paddle => {
    score[paddle.color] = 0;
  });
  g.collisionGroups.blocks.forEach(block => {
    if (block.color !== 'blank') {
      score[block.color] += 1;
    }
  })
  g.things.forEach(thing => g.remove(thing.sprite));

  const textUtil = new TextUtil(g);
  const scoreTexts = [];
  scoreTexts.push(
    textUtil.createHorizontallyCenteredText(
      'Round score',
      48,
      '#000000',
      128
    )
  );
  const scoreTextStrings = Object.keys(score).map(color => `${color}: ${score[color]}`);
  scoreTexts.push.apply(
    scoreTexts,
    textUtil.createHorizontallyCenteredTexts(scoreTextStrings, 36, '#000000', 192, 32)
  );

  g.wait(3000, () => {
    scoreTexts.forEach(text => g.remove(text));
    g.state = gameState(g);
  })

  return () => {};
};
