import TextUtil from '../text-util';
import mainMenuState from './main-menu';

module.exports = (g, winner) => {
  let score = g.globals.roundScore;

  const textUtil = new TextUtil(g);
  textUtil.centeredText(
    `${winner.toUpperCase()} WINS THE GAME!`,
    48,
    '#000000',
    128
  )

  g.wait(4000, () => {
    textUtil.clear();
    g.state = mainMenuState(g);
  })

  return () => {};
};
