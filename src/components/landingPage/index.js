import React, { useState } from 'react';
import Modal from './../modal';
import { If } from './../if/if.js';
import SignUpForm from './../form';
import Login from './../auth/login';
import useFetch from '../../hooks/fetch';
import './landingPage.scss';

import bbBrownMobile from './../../assets/barista-buddy-brown.png';
// import bbBrownMobile from './../../assets/bb-brown-mobile.png';


export default function LandingPage() {

  const [toggle, setToggle] = useState(false);
  // const [formData, setFormData] = useState({});
  const { request } = useFetch();

  const usersAPI = 'https://baristabuddyapi.azurewebsites.net/api/Users/register';


  const register = React.useCallback((data) => {
    const requestBody = {
      url: usersAPI,
      options: { method: "post", body: JSON.stringify(data) }
    }
    request(requestBody);
    
  }, [request]);

  const toggleModal = () => {
    setToggle(!toggle);
  }

  function getFormData(data) {
    // setFormData(data);
    register(data);
    toggleModal();
  }

  return (
    <>
      <div className="landing-page">
        <div className="login-wrapper">
          <img alt="Barista Buddy Landing Page Logo" src={bbBrownMobile} />
          <Login />
          <p onClick={toggleModal}>Need to register? Click here!</p>
        </div>
      </div>

      <If condition={toggle}>
        <Modal title="Register" onClose={toggleModal}>
          <SignUpForm data={getFormData} />
        </Modal>
      </If>
    </>
  )
}
