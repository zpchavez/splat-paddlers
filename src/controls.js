import colors from './colors';

let setsOfControls = [];

export function resetControls() {
  setsOfControls = [];
}

export function updateConnectedControllers(airconsole) {
  const activePlayers = airconsole.getActivePlayerDeviceIds();
  const connectedControllers = airconsole.getControllerDeviceIds();
  if (activePlayers.length < connectedControllers.length) {
    airconsole.setActivePlayers(connectedControllers.length);
  }
  updateMenuControllers(airconsole);
};

export function updateMenuControllers(airconsole) {
  const connectedControllers = airconsole.getControllerDeviceIds();
  for (let player = 0; player < Math.min(connectedControllers.length); player += 1) {
    const deviceId = airconsole.convertPlayerNumberToDeviceId(player);
    if (player === 0) {
      airconsole.message(deviceId, {
        controller: 'MainMenu',
        props: {
          activePlayers: connectedControllers.length,
        }
      });
    } else {
      airconsole.message(deviceId, {
        controller: 'Waiting'
      });
    }
  }
}

export function updateGameController(paddle) {
  const g = paddle.g;
  g.airconsole.message(
    g.airconsole.convertPlayerNumberToDeviceId(paddle.player - 1),
    {
      controller: g.globals.players === 1 ? 'AdvancedController' : 'SimpleController',
      props: {
        position: paddle.position,
        color: colors[paddle.color].fill,
        hasBall: !!paddle.caughtBall
      }
    }
  );
}

export function getPlayerControls(g, playerNumber) {
  const controls = {
    [playerNumber]: {
      up: { press: () => {}, release: () => {} },
      down: { press: () => {}, release: () => {} },
      left: { press: () => {}, release: () => {} },
      right: { press: () => {}, release: () => {} },
      action: { press: () => {}, release: () => {} },
    }
  };

  setsOfControls.push(controls);

  g.airconsole.onMessage = (from, data) => {
    const player = from;
    const action = data.substr(0, data.indexOf('-'));
    const button = data.substr(data.indexOf('-') + 1);
    setsOfControls.forEach(controls => {
      if (controls[player]) {
        controls[player][button][action]()
      }
    })
  };

  return controls[playerNumber];
}
