import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AuthUserContext from './context';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


const withAuthorization = condition => Component => {

    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (authUser) {
                        this.props.firebase
                            .user(authUser.uid)
                            .once('value')
                            .then(snapshot => {
                                const dbUser = snapshot.val();
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
                                if (!condition(authUser)) {
                                    this.props.history.push(ROUTES.LOG_IN);
                                }
                            });
                    } else {
                        this.props.history.push(ROUTES.LOG_IN);
                    }
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return(
                <AuthUserContext.Consumer>
                    {data =>
                        condition(data.authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            )
        }
    }

    return compose(
        withRouter,
        withFirebase,
    )(WithAuthorization);
};
export default withAuthorization;