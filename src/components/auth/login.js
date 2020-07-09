import React from 'react';
import useAuth from '../../contexts/auth';
import Button from 'react-bootstrap/Button';

const Login = () => {

    const { user, login, logout} = useAuth();
    const handleSubmit = e => {
        e.preventDefault();

        const { username, password } = e.target.elements;

        login(username.value, password.value);
    }

    const logoutSubmit = e => {
        e.preventDefault();
        logout();
    }

    console.log(user);

    
    if (user) {
        return (
            <div className="login">
                <h3>Welcome back, {user.username.split(" ")[0]}!</h3>
                <form onSubmit={logoutSubmit}>
                    <Button>Log Out</Button>
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