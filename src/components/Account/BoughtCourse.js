import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs, List, Avatar, Icon} from 'antd';

const { TabPane } = Tabs;
const data1 = [
    {
        title: 'TOEFL No Brainer - Speaking',
        description:"Lesson 1",
        tutor: 'Lisa Brian',
        date: '10/05/2019',
        time: '8:00pm',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/KaitlynM_e13daf1e.png'
    },
    {
        title: 'TOEFL No Brainer - Speaking',
        description:"Lesson 2",
        tutor: 'Lisa Brian',
        date: '10/06/2019',
        time: '8:00pm',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/KaitlynM_e13daf1e.png'
    },
    {
        title: 'TOEFL No Brainer - Speaking',
        description:"Lesson 3",
        tutor: 'Lisa Brian',
        date: '10/07/2019',
        time: '8:00pm',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/KaitlynM_e13daf1e.png'
    },
    {
        title: 'TOEFL No Brainer - Speaking',
        description:"Lesson 4",
        tutor: 'Lisa Brian',
        date: '10/08/2019',
        time: '8:00pm',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/KaitlynM_e13daf1e.png'
    },
];
const listData = [
    {   href: 'http://usc.edu',
        title: 'TOEFL No Brainer - Listening',
        price: 49.99,
        description:'Lisa Brian',
        content: 'This course prepares students for the TOEFL exam by ' +
            'presenting and practicing strategies to help improve the student’s ' +
            'listening skills. In addition, students are given practice in critical thinking ' +
            'and note-taking skills.',
        image: 'https://adlc.uad.ac.id/wp-content/uploads/TOEFL-Exam-Prep-1.jpg',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/KaitlynM_e13daf1e.png',
        star: 374,
        like: 83,
        cmmt: 5
    },
    {
        href:'http://usc.edu',
        title:'TOEFL No Brainer - Reading',
        price: 49.99,
        description:'Tommy Chen',
        content: 'This course prepares students for the TOEFL exam by ' +
            'presenting and practicing strategies to help improve the student’s ' +
            'reading skills. In addition, students are given practice in critical thinking ' +
            'and note-taking skills.',
        image: 'https://adlc.uad.ac.id/wp-content/uploads/TOEFL-Exam-Prep-1.jpg',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/DerekT_74d615e5.png',
        star: 443,
        like: 47,
        cmmt: 7
    }
];
for (let i = 0; i < 10; i++) {
    listData.push();
}
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class BoughtCourse extends React.Component {
    render() {
        return (
            <div className='table'>
                <Tabs type="card">
                    <TabPane tab="1:1 Recording" key="1">
                        <p>Here is your 1:1 tutoring recorded videos</p>
                        <p>Tutoring sessions are customized to meet identified learning objectives and areas for enrichment. Most importantly, our tutors use the most progressive and creative methods of instruction, utilizing a variety of supplemental resources and technology, to increase a student’s self-worth, personal development and joy.</p>
                        <List
                            itemLayout="vertical"
                            dataSource={data1}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href="https://usc.edu">{item.title}</a>}
                                        description={<span>{item.description} ·  {item.tutor} · {item.date} {item.time}</span>}
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab="Purchased Lessons" key="2">
                        <p>Here is your purchased coursed</p>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 5,
                            }}
                            dataSource={listData}
                            renderItem={item => (
                                <List.Item
                                    key={item.title}
                                    actions={[
                                        <IconText type="star-o" text={item.star} key="list-vertical-star-o" />,
                                        <IconText type="like-o" text={item.like} key="list-vertical-like-o" />,
                                        <IconText type="message" text={item.cmmt} key="list-vertical-message" />,
                                    ]}
                                    extra={
                                        <img
                                            width={272}
                                            alt="logo"
                                            src={item.image}
                                        />
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={
                                            <div>
                                                <div className='description'>{item.description}</div>
                                                <div className='price'>US$ {item.price}</div>
                                            </div>
                                        }
                                    />
                                    {item.content}
                                </List.Item>
                            )}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default BoughtCourse;