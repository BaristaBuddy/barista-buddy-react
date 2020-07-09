import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Header from './components/header';
import LandingPage from './components/landingPage';
import Stores from './components/stores';
import Menu from './components/menu';
import ShoppingCart from './components/shoppingCart';
import SignUpForm from './components/form';
import About from './components/about';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.css';

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {

  return (
    <>
      <Header />
      <Link to="/cart">
        <div className="cart-tab">
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
      </Link>
      <main>
        <div className="main-wrapper">
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
            <Route path="/cart">
              <ShoppingCart />
            </Route>
            <Route path="/register">
              <SignUpForm />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
