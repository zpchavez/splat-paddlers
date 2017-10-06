import { getPlayerControls } from '../controls';
import colors from '../colors';
import gameState from './game';
import TextUtil from '../text-util';
import Menu from '../menu';
import { resetControls } from '../controls';

export default (g) => {
  resetControls();

  const textUtil = new TextUtil(g);
  const titleText = textUtil.centeredText('Splat Paddlers!', 64, '#000000', 20);

  g.airconsole.onMessage = (from, data) => {
    const activePlayers = g.airconsole.getActivePlayerDeviceIds();
    switch (data) {
      case '1-player':
        g.globals = {
          players: 1,
        };
        textUtil.clear();
        g.state = gameState(g);
        g.airconsole.message(
          1,
          { controller: 'AdvancedController' }
        );
        break;
      case '2-players':
        g.globals = {
          players: 2,
        };
        textUtil.clear();
        g.state = gameState(g);
        g.airconsole.message(
          1,
          {
            controller: 'SimpleController',
            props: {
              orientation: 'landscape',
              color: colors.blue.fill,
            }
          }
        );
        g.airconsole.message(
          2,
          {
            controller: 'SimpleController',
            props: {
              orientation: 'portrait',
              color: colors.red.fill,
            }
          }
        );
        break;
      case '4-players-teams':
        g.globals = {
          players: 4,
          teams: true,
        };
        textUtil.clear();
        g.state = gameState(g);
        break;
      case '4-players-vs':
        g.globals = {
          players: 4,
          teams: false,
        };
        textUtil.clear();
        g.state = gameState(g);
        break;
    }

    if (g.globals.players === 4) {
      g.airconsole.message(
        1,
        {
          controller: 'SimpleController',
          props: {
            orientation: 'landscape',
            color: colors.blue.fill,
          }
        }
      );
      g.airconsole.message(
        2,
        {
          controller: 'SimpleController',
          props: {
            orientation: 'portrait',
            color: colors.red.fill,
          }
        }
      );
      g.airconsole.message(
        3,
        {
          controller: 'SimpleController',
          props: {
            orientation: 'landscape',
            color: colors.yellow.fill,
          }
        }
      );
      g.airconsole.message(
        4,
        {
          controller: 'SimpleController',
          props: {
            orientation: 'portrait',
            color: colors.green.fill,
          }
        }
      );
    }
  };
  return () => {};
}
