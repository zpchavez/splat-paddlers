import { h, render, Component } from 'preact';
import airconsole from '../airconsole';

class AdvancedController extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.setState({ touching: event.target.getAttribute('id') });
  }

  onTouchEnd(event) {
    this.setState({ touching: null });
  }

  onTouchMove(event) {
    var myLocation = event.changedTouches[0];
    var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
    var originalTarget = event.target;
    if (realTarget.getAttribute('id') !== this.state.touching) {
      this.setState({ touching: realTarget.getAttribute('id') });
    }
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
          id="left"
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          onTouchMove={this.onTouchMove}
          style={
            Object.assign(
              {
                width: (windowWidth / 2) - (topBarHeight / 2),
                height: windowHeight / 3,
              },
              buttonStyle
            )
          }
        >
          ↑
        </button>
        <button
          id="down"
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          onTouchMove={this.onTouchMove}
          style={
            Object.assign(
              {
                width: (windowWidth / 2) - (topBarHeight / 2),
                height: windowHeight / 3,
              },
              buttonStyle
            )
          }
        >
          ←
        </button>
        <button
          id="action"
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          onTouchMove={this.onTouchMove}
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
          id="right"
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          onTouchMove={this.onTouchMove}
          style={
            Object.assign(
              {
                width: (windowWidth / 2) - (topBarHeight / 2),
                height: windowHeight / 3,
              },
              buttonStyle
            )
          }
        >
          ↓
        </button>
        <button
          id="up"
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          onTouchMove={this.onTouchMove}
          style={
            Object.assign(
              {
                width: (windowWidth / 2) - (topBarHeight / 2),
                height: windowHeight / 3,
              },
              buttonStyle
            )
          }
        >
          →
        </button>
        <div style={{
          width: topBarHeight - 20,
          height: windowHeight - 10,
        }}>
          {/* <div style={{
            transform: 'rotate(90deg)',
            transformOrigin: 'left top 0',
          }}>
            Controlling such-and-such paddle
          </div> */}
        </div>
      </div>
    )
  }
}

export default AdvancedController;
