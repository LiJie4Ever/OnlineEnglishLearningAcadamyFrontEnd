import React from 'react';
import './index.css';
import Class from "./Class";

class ClassList extends React.Component {
    render() {
        return (
            <div className="list">
                <Class
                    info={{
                        title: "TOEFL no brainer",
                        intro: "Dive in and learn TOEFL from scratch! Learn Reading, Speaking, Listening, Writing and way more!",
                        tutor: "Leonardo da Vinci",
                        imgURL: "Image URL",
                        price: "49.99",
                        classLink: "Class Detail URL"
                    }}
                />

                <hr/>

                <Class
                    info={{
                        title: "TOEFL no brainer",
                        intro: "Dive in and learn TOEFL from scratch! Learn Reading, Speaking, Listening, Writing and way more!",
                        tutor: "Leonardo da Vinci",
                        imgURL: "Image URL",
                        price: "49.99",
                        classLink: "Class Detail URL"
                    }}
                />
            </div>

        );
    }
}

export default  ClassList;