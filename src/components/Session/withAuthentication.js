import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';


const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
                idToken: null
            };
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    authUser
                        ? this.setState({
                            authUser: authUser,
                        })
                        : this.setState({
                            authUser: null,
                        });

                    if (authUser !== null) {
                        authUser.getIdToken().then(string => {
                            this.setState({idToken: string});
                        }).catch(() => {
                            this.setState({idToken: null});
                        })
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