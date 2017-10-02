import { getPlayerControls } from '../controls';
import gameState from './game';
import TextUtil from '../text-util';
import Menu from '../menu';
import { resetControls } from '../controls';

export default (g) => {
  resetControls();
  g.airconsole.message(1, {
    controller: 'MainMenu'
  });
  g.airconsole.onConnect = function(deviceId) {
    const activePlayers = g.airconsole.getActivePlayerDeviceIds();
    const connectedControllers = g.airconsole.getControllerDeviceIds();
    if (activePlayers.length < connectedControllers.length) {
      g.airconsole.setActivePlayers(connectedControllers.length);
    }
    connectedControllers.forEach(connectedDeviceId => {
      const player = g.airconsole.convertDeviceIdToPlayerNumber(connectedDeviceId);
      if (player === 0) {
        g.airconsole.message(deviceId, {
          controller: 'MainMenu',
          props: {
            activePlayers: activePlayers.length,
          }
        });
      } else {
        g.airconsole.message(deviceId, {
          controller: 'Waiting'
        });
      }
    })
  };

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
          activePlayers[0],
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
              orientation: 'horizontal'
            }
          }
        );
        g.airconsole.message(
          2,
          {
            controller: 'SimpleController',
            props: {
              orientation: 'vertical'
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
  };
  return () => {};
}
