import React from 'react';
import useAuth from '../../contexts/auth';

const Login = () => {

    const { user} = useAuth();
    const handleSubmit = e => {
        e.preventDefault();

       // const { username, password } = e.target.elements;

        //login(username.value, password.value);
    }

    const logoutSubmit = e => {
        e.preventDefault();
        //logout();
    }

    //const user = auth.user;
    console.log(user);

    //switch back to user
    if (false) {
        return (
            <div className="login">
                {/* <h3>Welcome back, {user.username}!</h3> */}
                <form onSubmit={logoutSubmit}>
                    <button>Log Out</button>
                </form>
            </div>)
    }

    return (
        <form onSubmit={handleSubmit} className="login">
            <input placeholder="Username" name="username" />
            <input placeholder="Password" type="password" name="password" />
            <button>Login</button>
        </form>
    )
}

export default Login;