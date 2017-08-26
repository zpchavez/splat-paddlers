import TextUtil from '../text-util';
import gameState from './game';
import { getPlayerControls } from '../controls';

const fill = function(len) {
  return (Array(Math.max(0, len)).fill(' ')).join('');
}

const rpad = function(str, len) {
  return str + fill(len - str.length);
}

const lpad = function(str, len) {
  return fill(len - str.length) + str;
}

module.exports = (g) => {
  let score = {};
  g.collisionGroups.paddle.forEach(paddle => {
    score[paddle.color] = 0;
  });
  g.collisionGroups.block.forEach(block => {
    if (block.color !== 'blank') {
      score[block.color] += 1;
    }
  })
  g.things.forEach(thing => g.remove(thing.sprite));

  // Sort score descending
  const sortedScores = Object.keys(score).map(
    color => ({ color, score: score[color]})
  ).sort((a, b) => b.score - a.score);

  const longestColor = sortedScores.reduce(
    (acc, score) => score.color.length > acc ? score.color.length : acc,
    sortedScores[0].color.length
  );
  const longestScore = sortedScores.reduce(
    (acc, score) => score.score.toString().length > acc ? score.score.toString().length : acc,
    sortedScores[0].score.toString().length
  );

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

  const scoreTextStrings = sortedScores.map(
    ({ score, color }) => rpad(`${color}`, longestColor + 1) + lpad(`${score}`, longestScore)
  );
  scoreTexts.push.apply(
    scoreTexts,
    textUtil.createHorizontallyCenteredTexts(scoreTextStrings, 36, '#000000', 192, 48)
  );

  g.wait(3000, () => {
    scoreTexts.forEach(text => g.remove(text));
    g.state = gameState(g);
  })

  return () => {};
};
