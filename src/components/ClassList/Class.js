import React, { Component }from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Card, Icon, Avatar, Popover, Button } from 'antd';
import testImage from '../../images/test.jpeg';
import head from '../../images/profile.jpeg';

const { Meta } = Card;

const LessonIntro = (
    <div>
        <p>This is the introduction to the lesson</p>
    </div>
);

const TeacherIntro = (
    <div>
        <p>This is the introduction to the teacher</p>
    </div>
);

const priceIntro = (
    <div>
        <p>This is the introduction to the price</p>
    </div>
);

class ClassItem extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //TODO
    }

    render() {
        return(
            <Card
                style={{ width: 300 }}
                hoverable={true}
                cover={
                    <img
                        alt="example"
                        src={testImage}
                    />
                }
                actions={[
                    <Popover content={LessonIntro} title="Teacher" trigger="hover">
                        <Button type="primary" shape="circle" icon="book" />
                    </Popover>,
                    <Popover content={TeacherIntro} title="Price" trigger="hover">
                        <Button type="primary" shape="circle" icon="money-collect" />
                    </Popover>,
                    <Popover content={priceIntro} title="More" trigger="hover">
                        <Button type="primary" shape="circle" icon="more" />
                    </Popover>,
                ]}
            >
                <Meta
                    avatar={<Avatar src={head} />}
                    title="Course Title"
                    description="This is a very good course!!!"
                />
            </Card>
        )
    }
}

export default ClassItem;
