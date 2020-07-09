import React from 'react';
import useAuth from '../../contexts/auth';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

const Login = () => {

    const { user, login, logout} = useAuth();
    let history = useHistory();
    const handleSubmit = e => {
        e.preventDefault();

        const { username, password } = e.target.elements;

       const result = login(username.value, password.value);
       if (result) history.push("/stores");
    }

    const logoutSubmit = e => {
        console.log("logging out use");
        e.preventDefault();
        logout();
        
    }

    console.log(user);

    
    if (user) {
        return (
            <div className="login">
                <h3>Welcome back, {user.username.split(" ")[0]}!</h3>
                <form onSubmit={logoutSubmit}>
                    <Button onClick={logoutSubmit} >Log Out</Button>
                </form>
            </div>)
    }

    return (
        <form onSubmit={handleSubmit} className="login">
            <label>
              Email
            <input placeholder="Username" name="username" />
            </label>
            <label>
              password
            <input placeholder="Password" type="password" name="password" />
            </label>
            <Button>Login</Button>
        </form>
    )
}

export default Login;