import { h, render, Component } from 'preact';
import airconsole from '../airconsole';

class SimpleController extends Component {
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
        airconsole.message(AirConsole.SCREEN, `release-${prevState.touching}`)
      }
      if (this.state.touching) {
        airconsole.message(AirConsole.SCREEN, `press-${this.state.touching}`)
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

  render() {
    // const ratio = window.devicePixelRatio || 1;
    const ratio = 1;
    const windowWidth = screen.width * ratio;
    const windowHeight = screen.height * ratio;

    const buttonStyle = {
      margin: 0,
      padding: 0,
      fontSize: '2em',
      border: '1px solid black',
    };

    const topBarHeight = 32;

    return (
      <div class="controller">
        <button
          id="left"
          class="button button--left"
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24">
            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
          </svg>
        </button>
        <button
          id="action"
          class="action"
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
            <rect x="4" y="20" width="16" height="2"/>
            <polygon points="6.67 8 7.61 8.94 11.33 5.22 11.33 13.33 12.67 13.33 12.67 5.22 16.39 8.95 17.33 8 12 2.67 6.67 8"/>
            <circle cx="12" cy="18" r="2"/>
          </svg>
        </button>
        <button
          id="right"
          class="button button--right"
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

export default SimpleController;
