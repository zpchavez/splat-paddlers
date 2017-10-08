import { h, render, Component } from 'preact';
import airconsole from '../airconsole';

class AdvancedController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touches: 0,
      touching: null,
    };

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.touching !== this.state.touching) {
      if (prevState.touching) {
        prevState.touching.split('-').forEach(direction => {
          airconsole.message(AirConsole.SCREEN, `release-${direction}`)
        })
      }
      if (this.state.touching) {
        this.state.touching.split('-').forEach(direction => {
          airconsole.message(AirConsole.SCREEN, `press-${direction}`)
        });
      }
    }
  }

  sendMessage(message) {
    airconsole.message(AirConsole.SCREEN, message)
  }

  onTouchStart(event) {
    this.setState(prevState => {
      const state = Object.assign({}, prevState);
      const action = event.currentTarget.getAttribute('id');
      if (action === 'action') {
        this.sendMessage('press-action');
      } else {
        state.touching = event.currentTarget.getAttribute('id');
        state.touches += 1;
      }
      return state;
    });
  }

  onTouchEnd(event) {
    this.setState(prevState => {
      const state = Object.assign({}, prevState);
      const action = event.currentTarget.getAttribute('id');
      if (action !== 'action') {
        state.touches -= 1;
        if (state.touches === 0) {
          state.touching = null;
        }
        return state;
      }
    });
  }

  renderActionButton() {
    return (
      <button
        id="action"
        class="action"
        style={{visibility: this.props.hasBall ? 'visible' : 'hidden'}}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
          <rect x="4" y="20" width="16" height="2"/>
          <polygon points="6.67 8 7.61 8.94 11.33 5.22 11.33 13.33 12.67 13.33 12.67 5.22 16.39 8.95 17.33 8 12 2.67 6.67 8"/>
          <circle cx="12" cy="18" r="2"/>
        </svg>
      </button>
    );
  }

  render() {
    const buttonStyle = {
      background: 'black'
    };

    return (
      <div class="controller">
        <button
          id="left-up"
          style={buttonStyle}
          class="button"
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24">
            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
          </svg>
        </button>
        {this.renderActionButton()}
        <button
          id="right-down"
          style={buttonStyle}
          class="button"
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24">
            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
          </svg>
        </button>
      </div>
    );
  }
}

export default AdvancedController;
