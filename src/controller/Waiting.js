import { h, Component } from 'preact';

class Waiting extends Component
{
  render() {
    return (
      <h1 className="waiting-message">
        Waiting for Player 1
      </h1>
    );
  }
}

export default Waiting;
