import React, { useContext } from 'react';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

// TODO: Input Users API url below
const usersAPI = 'https://baristabuddyapi.azurewebsites.net/api/Users/';

export const AuthContext = React.createContext();

export default function useAuth() {
    return useContext(AuthContext);
}

export class AuthProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            permissions: [],

            login: this.login,
            logout: this.logout,
        };
    }


    login = async (username, password) => {
        const result = await fetch(`${usersAPI}/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const body = await result.json();
        console.log(body);

        if (result.ok) {
            if(this.processToken(body.token, body)){
                return true;
            }
        }

        //TODO: userError state
        this.logout();
    }

    logout = () => {
        this.setState({token: null, user: null, permissions: [] });
        cookie.remove('auth', {path: "/"});
    }

    processToken(token, user) {
        try {
            const payload = jwt.decode(token);
            if (payload) {
                if(payload.exp*1000 < Date.now()) {
                    this.logout();
                    return;
                }
                if (true) {
                    user = {
                        //id: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                        id: payload.sub,
            //username: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            username: payload.FullName
                    };
                }
                console.log(user);
                this.setState({
                    token,
                    user,
                    permissions: payload.permissions || [],
                });
                cookie.save('auth', token, {path: "/"});
                return true;
            }
        } catch(e) {
            console.warn(e);
            this.logout();
        }
    }

    componentDidMount() {
        const cookieToken = cookie.load('auth');
        if (cookieToken) console.log('Found auth cookie!');

        this.processToken(cookieToken);
    }

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}