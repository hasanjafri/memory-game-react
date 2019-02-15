import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import History from './components/History';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Router history={History}>
          <React.Fragment>
            <NavBar />
            <Routes />
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
