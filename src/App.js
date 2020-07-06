import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route } from 'react-router-dom';
import About from './components/about';

function App() {
  return (

          <Route path="/about">
            <About />

          </Route>
     
  );
}

export default App;
