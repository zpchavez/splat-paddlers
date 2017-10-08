require('../lib/ga.js');
require('../lib/custom.js');

import mainMenuState from './states/main-menu';
import Sfx from './sfx';
import { updateConnectedControllers, updateMenuControllers } from './controls';

const ga = window.ga;

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
