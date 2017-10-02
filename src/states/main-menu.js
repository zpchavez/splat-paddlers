import { getPlayerControls } from '../controls';
import gameState from './game';
import TextUtil from '../text-util';
import Menu from '../menu';
import { resetControls } from '../controls';

const updateControllers = (airconsole) => {
  const connectedControllers = airconsole.getControllerDeviceIds();
  for (let player = 1; player <= Math.min(connectedControllers.length, 4); player += 1) {
    if (player === 1) {
      airconsole.message(1, {
        controller: 'MainMenu',
        props: {
          activePlayers: connectedControllers.length,
        }
      });
    } else {
      airconsole.message(player, {
        controller: 'Waiting'
      });
    }
  }
}

const updateConnectedControllers = (airconsole, deviceId) => {
  const activePlayers = airconsole.getActivePlayerDeviceIds();
  const connectedControllers = airconsole.getControllerDeviceIds();
  if (activePlayers.length < connectedControllers.length) {
    airconsole.setActivePlayers(connectedControllers.length);
  }
  updateControllers(airconsole);
};

export default (g) => {
  resetControls();
  updateControllers(g.airconsole);
  g.airconsole.onConnect = function(deviceId) {
    updateConnectedControllers(g.airconsole, deviceId);
  };
  g.airconsole.onDisconnect = function(deviceId) {
    updateConnectedControllers(g.airconsole, deviceId);
  }

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

    if (g.globals.players === 4) {
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
      g.airconsole.message(
        3,
        {
          controller: 'SimpleController',
          props: {
            orientation: 'horizontal'
          }
        }
      );
      g.airconsole.message(
        4,
        {
          controller: 'SimpleController',
          props: {
            orientation: 'vertical'
          }
        }
      );
    }
  };
  return () => {};
}
