import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.global.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: icon,
      size: 200,
    };
  }

  replaceImage() {
    window.electron.ipcRenderer.once('ipc-replace-image', (selectedFile) => {
      if (!selectedFile.canceled) {
        this.setState({ imgSrc: selectedFile.imageData });
      }
    });
    window.electron.ipcRenderer.send('ipc-replace-image');
  }

  render() {
    const { size, imgSrc } = this.state;

    return (
      <div>
        <div className="Hello">
          <img width={`${size}px`} alt="icon" src={imgSrc} />
        </div>
        <h1>electron-react-boilerplate</h1>
        <div className="Hello">
          <a
            href="https://electron-react-boilerplate.js.org/"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button">
              <span role="img" aria-label="books">
                📚
              </span>
              Read our docs
            </button>
          </a>
          <a
            href="https://github.com/sponsors/electron-react-boilerplate"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button">
              <span role="img" aria-label="books">
                🙏
              </span>
              Donate
            </button>
          </a>
          <button type="button" onClick={() => this.replaceImage()}>
            Replace image
          </button>
        </div>
      </div>
    );
  }
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
