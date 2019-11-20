import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs, List, Avatar, Icon} from 'antd';

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
    },
    {
        href:'http://usc.edu',
        title:'TOEFL No Brainer - Speaking',
        price: 49.99,
        description:'Jack Ber',
        content: 'This course prepares students for the TOEFL exam by ' +
            'presenting and practicing strategies to help improve the student’s ' +
            'speaking skills. In addition, students are given practice in critical thinking ' +
            'and note-taking skills.',
        image: 'https://adlc.uad.ac.id/wp-content/uploads/TOEFL-Exam-Prep-1.jpg',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/Jeremy_548a87ab.png',
        star: 398,
        like: 234,
        cmmt: 4
    },
    {
        href:'http://usc.edu',
        title:'TOEFL No Brainer - Writing',
        price: 49.99,
        description:'Martin D. D',
        content: 'This course prepares students for the TOEFL exam by ' +
            'presenting and practicing strategies to help improve the student’s ' +
            'writing skills. In addition, students are given practice in critical thinking ' +
            'and note-taking skills.',
        image: 'https://adlc.uad.ac.id/wp-content/uploads/TOEFL-Exam-Prep-1.jpg',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/LoganM_be634aab.png',
        star: 327,
        like: 57,
        cmmt: 7
    },
    {
        href:'http://usc.edu',
        title:'IELTS - Speaking',
        price: 59.99,
        description:'Tule',
        content: 'This course prepares students for the IELTS exam by ' +
            'presenting and practicing strategies to help improve the student’s ' +
            'speaking skills. In addition, students are given practice in critical thinking ' +
            'and note-taking skills.',
        image: 'https://i.ytimg.com/vi/8SPTbmew5JY/maxresdefault.jpg',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/ChantalM_b46dccb5.png',
        star: 236,
        like: 69,
        cmmt: 9
    },
    {
        href:'http://usc.edu',
        title:'IELTS - Reading',
        price: 59.99,
        description:'Martin D. D',
        content: 'This course prepares students for the IELTS exam by ' +
            'presenting and practicing strategies to help improve the student’s ' +
            'reading skills. In addition, students are given practice in critical thinking ' +
            'and note-taking skills.',
        image: 'https://i.ytimg.com/vi/8SPTbmew5JY/maxresdefault.jpg',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/LoganM_be634aab.png',
        star: 236,
        like: 32,
        cmmt: 2
    },
    {
        href:'http://usc.edu',
        title:'IELTS - Writing',
        price: 59.99,
        description:'Griffith',
        content: 'This course prepares students for the IELTS exam by ' +
            'presenting and practicing strategies to help improve the student’s ' +
            'writing skills. In addition, students are given practice in critical thinking ' +
            'and note-taking skills.',
        image: 'https://i.ytimg.com/vi/8SPTbmew5JY/maxresdefault.jpg',
        avatar: 'https://cdn1.i-scmp.com/sites/default/files/styles/1200x800/public/images/methode/2018/05/23/cb49e7f0-5e1f-11e8-a4de-9f5e0e4dd719_1280x720_184250.jpg',
        star: 324,
        like: 32,
        cmmt: 3
    },
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

class BroughtCourse extends React.Component {
    render() {
        return (
            <div className='list'>
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
            </div>
        );
    }
}

export default BroughtCourse;