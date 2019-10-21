import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';


const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: JSON.parse(localStorage.getItem('authUser')),
                idToken: localStorage.getItem('idToken')
            };
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (authUser !== null) {
                        localStorage.setItem('authUser', JSON.stringify(authUser));
                        this.setState({
                            authUser: authUser,
                        });
                        authUser.getIdToken().then(string => {
                            localStorage.setItem('idToken', string);
                            this.setState({idToken: string});
                        }).catch(() => {
                            localStorage.removeItem('idToken');
                            this.setState({idToken: null});
                        })
                    } else {
                        localStorage.removeItem('authUser');
                        localStorage.removeItem('idToken');
                        this.setState({
                            authUser: null,
                            idToken: null
                        });
                    }
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }
    return withFirebase(WithAuthentication);
};

export default withAuthentication;