import { h, Component } from 'preact';
import airconsole from '../airconsole';

class MainMenuController extends Component
{
  startGame(mode) {
    airconsole.message(
      AirConsole.SCREEN,
      mode
    );
  }

  render() {
    const activePlayers = this.props.activePlayers;

    return (
      <div className="menu">
        <h1>Splat Paddlers</h1>
        <div>
          <button
            onClick={this.startGame.bind(this, '1-player')}
          >
            1 Player (PRACTICE)
          </button>
        </div>
        <div>
          <button
            disabled={activePlayers < 2}
            onClick={this.startGame.bind(this, '2-players')}
          >
            2 Players
          </button>
        </div>
        <div>
          <button
            disabled={activePlayers < 4}
            onClick={this.startGame.bind(this, '4-players-teams')}
          >
            4 Players (Teams)
          </button>
        </div>
        <div>
          <button
            disabled={activePlayers < 4}
            onClick={this.startGame.bind(this, '4-players-vs')}
          >
            4 Players (Vs)
          </button>
        </div>
      </div>
    );
  }
}

export default MainMenuController;
