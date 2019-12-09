import React from 'react';
const FirebaseContext = React.createContext(null);

// this the hoc that wrapper the firebase function
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;
