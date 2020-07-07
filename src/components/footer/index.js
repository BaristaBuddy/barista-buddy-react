import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './footer.scss';

export default function Footer() {
    
    return (
        <footer>
            <div className="theme-buttons">
                <Button variant="Secondary">
                    Color: Original
                </Button>
                <Button variant="Secondary">
                    Color: Dark
                </Button>
                <Button variant="Secondary">
                    Color: Color Blind
                </Button>
                </div>
            <span>&copy; 2020 Barista Buddy</span>
            <Link to="/about">
            About the Developers
            </Link>
        </footer>

    )
}