require('../lib/jsfxr.js');

class Sfx {
  constructor() {
    this.soundUrls = {
      hit1: jsfxr([2,,0.0976,0.2877,0.1658,0.2279,,-0.0955,0.1895,0.1427,0.1006,0.0542,0.0642,0.1476,0.0347,0.06,-0.011,-0.2045,0.9872,0.1328,0.2049,0.0809,0.1951,0.5]),
      hit2: jsfxr([2,,0.1217,,0.3064,0.549,0.0183,-0.5849,,,,,,0.7132,-0.2861,,0.1225,-0.0788,1,,,0.1491,,0.5]),
      hit3: jsfxr([0,,0.157,,0.0593,0.4355,0.0211,-0.6071,,,,,,0.4496,-0.2923,,0.1523,-0.1522,1,,,,,0.5]),
      pit1: jsfxr([2,0.0058,0.01,0.4566,0.8036,0.5835,,-0.0002,0.3292,0.7897,-0.4659,0.6245,0.2038,-0.8218,-0.0847,,0.56,-0.3056,0.5838,0.0861,,,0.0104,0.5]),
      pit2: jsfxr([0,,0.2612,,0.3432,0.2269,,0.2139,,,,,,0.5027,,0.5871,,,1,,,,,0.5]),
    };
    this.sounds = {};
    Object.keys(this.soundUrls).forEach(key => {
      this.sounds[key] = [
        new Audio(this.soundUrls[key]),
        new Audio(this.soundUrls[key]) // alternate if one is already playing
      ];
    })
  }

  play(key) {
    if (this.sounds[key][0].paused) {
      this.sounds[key][0].play();
    } else if (this.sounds[key][1].paused) {
      this.sounds[key][1].play();
    }
  }
}

export default Sfx;
