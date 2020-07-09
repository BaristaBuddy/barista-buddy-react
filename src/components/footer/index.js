import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './footer.scss';

export default function Footer() {

  return (
    <footer>
      <div className="theme-buttons">
        <Button variant="primary">
          Color: Original
                </Button>
        <Button variant="primary">
          Color: Dark
                </Button>
        <Button variant="primary">
          Color: Color Blind
                </Button>
      </div>
      <div className="foot-content">
        <span>&copy; 2020 Barista Buddy</span>
        <Link to="/about">
          About the Developers
            </Link>
      </div>
    </footer>

  )
}