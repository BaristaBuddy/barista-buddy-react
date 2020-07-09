import React from 'react';
import './header.scss';
import Login from "../auth/login";
import bbBrownMobile from '../../assets/bb-brown-mobile.png';

export default function Header() {
  //const theme = useTheme();

  return (
    <header>
      <div className="header-wrapper">
        <div className="image-wrapper">
          <img alt="Barista Buddy Logo in soft caramel" src={bbBrownMobile} />
        </div>
        <div className="users">
          <Login />
        </div>
      </div>
    </header>
  )
}