const airconsole = new AirConsole();

import { h, render, Component } from 'preact';

class Controller extends Component {
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
    const windowHeight = document.documentElement.clientHeight;
    const windowWidth = document.documentElement.clientWidth;

    const buttonStyle = {
      margin: 0,
      padding: 0,
      fontSize: '2em',
      height: windowWidth,
      flexGrow: 1,
      border: '1px solid black',
    };

    const containerStyle = {
      display: 'flex',
      flexDirection: 'row',
      margin: 0,
      padding: 0,
    }

    return (
      <div style={{
        margin: 0,
        padding: 0,
        display: 'flex',
        transform: 'rotate(90deg)',
        // transformOrigin: '0 100%'
      }}>
        <div
          style={containerStyle}
        >
          <button
            id="left"
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}
            onTouchMove={this.onTouchMove}
            style={
              Object.assign(
                {
                  width: windowHeight / 6
                },
                buttonStyle
              )
            }
          >
            ←
          </button>
          <button
            id="right"
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}
            onTouchMove={this.onTouchMove}
            style={
              Object.assign(
                {
                  width: windowHeight / 6
                },
                buttonStyle
              )
            }
          >
            →
          </button>
        </div>
        <div
          style={containerStyle}
        >
          <button
            id="action"
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}
            onTouchMove={this.onTouchMove}
            style={buttonStyle}
          >
            Release
          </button>
        </div>
        <div
          style={
            Object.assign(
              {
                // width: windowHeight / 2,
                flexWrap: 'wrap',
              },
              containerStyle
            )
          }
        >
          {/* <div> */}
            <button
              id="up"
              onTouchStart={this.onTouchStart}
              onTouchEnd={this.onTouchEnd}
              onTouchMove={this.onTouchMove}
              style={
                Object.assign(
                  {},
                  buttonStyle,
                  {
                    width: windowHeight / 2.35,
                    height: windowWidth / 2,
                  },
                )
              }
            >
              ↑
            </button>
          {/* </div> */}
          {/* <div> */}
            <button
              id="down"
              onTouchStart={this.onTouchStart}
              onTouchEnd={this.onTouchEnd}
              onTouchMove={this.onTouchMove}
              style={
                Object.assign(
                  {},
                  buttonStyle,
                  {
                    width: windowHeight / 2.35,
                    height: windowWidth / 2,
                  },
                )
              }
            >
              ↓
            </button>
          {/* </div> */}
        </div>
      </div>
    )
  }
}

render(<Controller />, document.body);
