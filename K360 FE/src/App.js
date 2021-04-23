import React, { Component } from 'react';
import MinimizableWebChat from './MinimizableWebChat';
//import WebPageBackground from './WebPage.jpg';
import './App.css';
//import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
/*      <Router>
        <div className="App">
          <img alt="product background" src={WebPageBackground} />
          <Route path="/" exact component={MinimizableWebChat} />
        </div>
      </Router> */
      
      <div className="App">
        <MinimizableWebChat/>        
      </div>
    );
  }
}

export default App;
