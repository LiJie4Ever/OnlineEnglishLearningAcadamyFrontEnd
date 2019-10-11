import React from 'react';
import { Component } from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import NavBar from './components/Navbar';

class App extends Component {
  render() {
      return (
          <Provider store={store}>
              <NavBar />
          </Provider>
      )
  }
}

export default App;
