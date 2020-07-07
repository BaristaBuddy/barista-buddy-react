import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Stores from './components/stores';
import Menu from './components/menu';
import SignUpForm from './components/form';
import About from './components/about';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Stores />
          </Route>
          {/* <Route path="/{ storeId }/menu">
            <Menu />
          </Route> */}
          <Route path="/register">
            <SignUpForm />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
