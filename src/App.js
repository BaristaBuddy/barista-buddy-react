import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Header from './components/header';
import LandingPage from './components/landingPage';
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
            <LandingPage />
            </Route>
            <Route path="/stores">
            <Stores />
          </Route>
          <Route path="/menu/:storeId">
            <Menu />
          </Route>
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
