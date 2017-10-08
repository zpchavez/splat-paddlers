require('../lib/ga.js');
require('../lib/custom.js');

import mainMenuState from './states/main-menu';
import Sfx from './sfx';

const ga = window.ga;

const updateControllers = (airconsole) => {
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

const updateConnectedControllers = (airconsole, deviceId) => {
  const activePlayers = airconsole.getActivePlayerDeviceIds();
  const connectedControllers = airconsole.getControllerDeviceIds();
  if (activePlayers.length < connectedControllers.length) {
    airconsole.setActivePlayers(connectedControllers.length);
  }
  updateControllers(airconsole);
};

var g = ga(
  768,
  800,
  () => {
    g.canvas.style.border = "2px black solid";
    g.canvas.style.display = "block";
    g.canvas.style.margin = "auto";
    g.backgroundColor = "white";
    g.sfx = new Sfx();
    g.clearState = function() {
      if (this.texts) {
        this.remove(this.texts);
      }
      if (this.things) {
        this.things.forEach(thing => thing.remove());
      }
    }
    g.airconsole = new AirConsole();

    updateControllers(g.airconsole);

    const onConnectOrDisconnect = function(deviceId) {
      updateConnectedControllers(g.airconsole, deviceId);
      g.clearState();
      g.state = mainMenuState(g);
    };
    g.airconsole.onConnect = onConnectOrDisconnect;
    g.airconsole.onDisconnect = onConnectOrDisconnect;

    g.state = mainMenuState(g);
  },
);

g.start();
