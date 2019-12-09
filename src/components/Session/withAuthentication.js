import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

// this is the hoc that check the identify of the users
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
                    if (authUser) {
                        authUser.getIdToken().then(string => {
                            localStorage.setItem('idToken', string);
                            this.setState({idToken: string});
                        }).catch(() => {
                            localStorage.removeItem('idToken');
                            this.setState({idToken: null});
                        });
                        this.props.firebase
                            .user(authUser.uid)
                            .get()
                            .then(snapshot => {
                                const dbUser = snapshot.data();
                                // default empty roles
                                if (!dbUser.roles) {
                                    dbUser.roles = {};
                                }
                                // merge auth and db user
                                authUser = {
                                    uid: authUser.uid,
                                    email: authUser.email,
                                    emailVerified: authUser.emailVerified,
                                    providerData: authUser.providerData,
                                    ...dbUser,
                                };
                                this.setState({ authUser: authUser });
                                localStorage.setItem('authUser', JSON.stringify(authUser));
                            });
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