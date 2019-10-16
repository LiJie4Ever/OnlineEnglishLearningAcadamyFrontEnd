import React from 'react';
import QandA from "./QandA";
import './index.css';

class Faq extends React.Component {
    render() {
        return (
            <div className='list'>
                <QandA
                    qa={{
                        q: "This is 1st Question",
                        a: "This is the Answer"
                    }}
                />
                <QandA
                    qa={{
                        q: "This is 2nd Question",
                        a: "This is the Answer"
                    }}
                />
                <QandA
                    qa={{
                        q: "This is 3rd Question",
                        a: "This is the Answer"
                    }}
                />
                <QandA
                    qa={{
                        q: "Mirror, Mirror on the Wall, Who's the Fairest of Them All?",
                        a: "Thou, O Queen, art the fairest in the land."
                    }}
                />
            </div>
        );
    }
}

export default  Faq;