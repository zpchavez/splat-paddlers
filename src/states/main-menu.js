import { getPlayerControls } from '../controls';
import gameState from './game';
import TextUtil from '../text-util';
import Menu from '../menu';
import { resetControls } from '../controls';

export default (g) => {
  resetControls();
  const textUtil = new TextUtil(g);
  const titleText = textUtil.centeredText('Splat Paddlers!', 64, '#000000', 20);
  const menu = new Menu(g);
  menu.setYPosition(256);
  menu.addItem('1 Player (Practice)', () => {
    g.globals = {
      players: 1,
    };
    textUtil.clear();
    g.state = gameState(g);
  });
  menu.addItem('2 Players', () => {
    g.globals = {
      players: 2,
    };
    textUtil.clear();
    g.state = gameState(g);
  });
  menu.addItem('4 Players (Teams)', () => {
    g.globals = {
      players: 4,
      teams: true,
    };
    textUtil.clear();
    g.state = gameState(g);
  })
  menu.addItem('4 Players (VS)', () => {
    g.globals = {
      players: 4,
      teams: false,
    };
    textUtil.clear();
    g.state = gameState(g);
  })
  return () => {
    menu.draw();
  };
}
