import { getPlayerControls } from '../controls';
import gameState from './game';
import TextUtil from '../text-util';
import Menu from '../menu';

export default (g) => {
  const textUtil = new TextUtil(g);
  const titleText = textUtil.createHorizontallyCenteredText('Splat Paddlers!', 64, '#000000', 20);
  const menu = new Menu(g);
  menu.setYPosition(256);
  menu.addItem('2 Players', () => {
    g.globals = {
      players: 2
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
