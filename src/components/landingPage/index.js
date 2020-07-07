import React, { Component } from 'react';
import Modal from './../modal';
import { If } from './../if/if.js';
import SignUpForm from './../form';
import Login from './../auth/login';

import bbBrown from './../../assets/barista-buddy-brown.png';

export default function LandingPage() {

  const toggleModal = () => {
    this.setState(oldState => ({ showModal: !oldState.showModal }));
  }

  const { showModal } = this.state;

  return (
    <>
    <div className="landing-page">
      <img alt="Barista Buddy Landing Page Logo" src={bbBrown} />
      <Login />
      <p onClick={toggleModal}>Need to register? Click here!</p>
    </div>

      <If condition={showModal}>
        <Modal title="Register" onClose={this.toggleModal}>
          <SignUpForm />
        </Modal>
      </If>
    </>
  )
}
