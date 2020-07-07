import React from 'react';
import Login from "../auth/login";

import '../../index.scss';
import BBbrown from '../../assets/barista-buddy-brown.png';

export default function Header() {
    //const theme = useTheme();

    return (
        <header>
            {/* <div className="head-image"> */}
            <img alt="Barista Buddy Logo in soft caramel" src={BBbrown} />
            {/* </div> */}
            <div className="users">
                {/* <Login /> */}
            </div>
        </header>
    )
}