import React from 'react';
import Login from "../auth/login";

import BBbrown from '../../assets/barista-buddy-brown.png';

export default function Header() {
    //const theme = useTheme();

    return (
        <header>
            <img alt="Barista Buddy Logo in soft caramel" src={BBbrown} />
            <div className="users">
                {/* <Login /> */}
            </div>
        </header>
    )
}