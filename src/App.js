import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Stores from './components/stores';
import Menu from './components/menu';
import RegistrationForm from './components/form';
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
          </Switch>
          {/* <Route path="/{ storeId }/menu">
            <Menu />
          </Route>
          <Route path="/register">
            <RegistrationForm />
          </Route> */}
          <Route path="/about">
            <About />
          </Route>
        {/* </Switch> */}
      </main>
      <Footer />
    </>
  );
}

export default App;
