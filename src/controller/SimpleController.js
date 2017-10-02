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
    this.onTouchMove = this.onTouchMove.bind(this);
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
      state.touching = event.target.getAttribute('id');
      state.touches += 1;
      return state;
    });
  }

  onTouchEnd(event) {
    this.setState(prevState => {
      const state = Object.assign({}, prevState);
      state.touches -= 1;
      if (state.touches === 0) {
        state.touching = null;
      }
      return state;
    });
  }

  onTouchMove(event) {
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
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: windowHeight,
        marginTop: '3em'
      }}>
        <button
          id={ this.props.orientation === 'horizontal' ? 'left' : 'up' }
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          style={
            Object.assign(
              {
                width: (windowWidth) - (topBarHeight),
                height: windowHeight / 3,
              },
              buttonStyle
            )
          }
        >
          ↑
        </button>
        <button
          id="action"
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          style={
            Object.assign(
              {
                width: windowWidth - topBarHeight,
                height: windowHeight / 6,
              },
              buttonStyle
            )
          }
        >
          Release
        </button>
        <button
          id={ this.props.orientation === 'horizontal' ? 'right' : 'down' }
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          style={
            Object.assign(
              {
                width: (windowWidth) - (topBarHeight),
                height: windowHeight / 3,
              },
              buttonStyle
            )
          }
        >
          ↓
        </button>
      </div>
    )
  }
}

export default SimpleController;
