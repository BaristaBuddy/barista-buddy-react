import React from 'react';
import Login from "../auth/login";

export default function Header() {
    //const theme = useTheme();

    return (
        <header>
            <div className="users">
            <Login />
            </div>
            </header>
    )
}