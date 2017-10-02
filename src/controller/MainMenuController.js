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

    const buttonStyle = {
      border: '1px solid black',
      width: '100%',
      height: '3em',
      marginBottom: '1em',
    };

    return (
      <div>
        <h1>Splat Paddlers</h1>
        <div>
          <button
            style={buttonStyle}
            onClick={this.startGame.bind(this, '1-player')}
          >
            1 Player (PRACTICE)
          </button>
        </div>
        <div>
          <button
            style={buttonStyle}
            onClick={this.startGame.bind(this, '2-players')}
          >
            2 Players
          </button>
        </div>
        <div>
          <button
            style={buttonStyle}
            onClick={this.startGame.bind(this, '4-players-teams')}
          >
            4 Players (Teams)
          </button>
        </div>
        <div>
          <button
            style={buttonStyle}
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
