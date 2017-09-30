const airconsole = new AirConsole();

import { h, render, Component } from 'preact';

class Controller extends Component {
  sendMessage(message) {
    console.log('sending message to screen', message);
    airconsole.message(AirConsole.SCREEN, message)
  }

  render() {
    const buttonStyle = {
      // padding: '2em',
      // width: '15%',
      // height: '35%'
      fontSize: '5em',
      flexGrow: 1
    };
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <button
            onMouseDown={this.sendMessage.bind(this, 'press-up')}
            onMouseUp={this.sendMessage.bind(this, 'release-up')}
            style={buttonStyle}
          >
            ↑
          </button>
          <button
            onMouseDown={this.sendMessage.bind(this, 'press-down')}
            onMouseUp={this.sendMessage.bind(this, 'release-down')}
            style={buttonStyle}
          >
            ↓
          </button>
          <button
            onMouseDown={this.sendMessage.bind(this, 'press-left')}
            onMouseUp={this.sendMessage.bind(this, 'release-left')}
            style={buttonStyle}
          >
            ←
          </button>
          <button
            onMouseDown={this.sendMessage.bind(this, 'press-right')}
            onMouseUp={this.sendMessage.bind(this, 'release-right')}
            style={buttonStyle}
          >
            →
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <button
            onMouseDown={this.sendMessage.bind(this, 'press-action')}
            onMouseUp={this.sendMessage.bind(this, 'release-action')}
            style={buttonStyle}
          >
            Release
          </button>
        </div>
      </div>
    )
  }
}

render(<Controller />, document.body);
