import { h, render, Component } from 'preact';
import Waiting from './controller/Waiting';
import AdvancedController from './controller/AdvancedController';
import SimpleController from './controller/SimpleController';
import MainMenuController from './controller/MainMenuController';
import airconsole from './airconsole';

class ControllerWrapper extends Component
{
  constructor(props) {
    super(props);

    airconsole.onMessage = (from, data) => {
      if (from === AirConsole.SCREEN && data.controller) {
        switch (data.controller) {
          case 'MainMenu':
            this.setState({ controller: MainMenuController, props: data.props })
            break;
          case 'AdvancedController':
            this.setState({ controller: AdvancedController })
            break;
          case 'SimpleController':
            this.setState({ controller: SimpleController, props: data.props })
            break;
          case 'Waiting':
            this.setState({ controller: Waiting })
            break
        }
      }
    };

    this.state = {
      controller: Waiting,
      props: {}
    };
  }

  render() {
    return <this.state.controller { ...this.state.props }/>;
  }
}

render(
  <ControllerWrapper />,
  document.body
);
