import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs, List, Avatar, Icon} from 'antd';

const { TabPane } = Tabs;
const data1 = [
    {
        title: '5/1/2019',
        description:"Complete nightly homework in a time efficient manner",
    },
    {
        title: '5/10/2019',
        description:"Understand the material thoroughly  ",
    },
    {
        title: '6/5/2019',
        description:"Learn 21st Century Skills",
    },
    {
        title: '7/20/2019',
        description:"Reach academic goals while improving confidence and self-esteem",
    },
];
const listData = [
    {   href: 'http://usc.edu',
        title: 'Tture',
        description:'Tutoring sessions are customized to meet identified learning objectives and areas for enrichment. Most importantly, our tutors use the most progressive and creative methods of instruction, utilizing a variety of supplemental resources and technology, to increase a student’s self-worth, personal development and joy.',
    },
    {
        href:'http://usc.edu',
        title:'Mr. Jeremy',
        description:'There seem to be two prevailing preconceptions when it comes to Millennials. The first is they are incapable of sitting still, be it career-wise, in relationships, or even in geography. The second is that they eat obscene amounts of avocado on toast.',
    },
    {
        href:'http://usc.edu',
        title:'Best Perks of Teaching Online, From Home',
        description:'Cintra is from the United States and graduated from Columbia University with a bachelor\'s degree in history and politics and a master\'s degree in education. Ms. Cintra has taught at a high school in Manhattan and a private school. She has extensive teaching experience and can teach courses in reading, writing, listening and speaking skills. Cintra will do everything in his power to bring the best English learning classes for VIPKID kids. Let\'s book a class!',
    },{
        href:'http://usc.edu',
        title:'Earn your worth',
        description:'Mr. Selena is from the United States and graduated from Wesleyan University with a Ph.D. in Nutritional Health. The teacher has rich teaching experience and has 13 years of teaching experience. She has taught in many countries. Another name of Selena\'s teacher is the actor. She will take advantage of the actors in her teaching style and create a lively and interesting class for the students. The teacher is very happy to have the opportunity to work at VIPKID. She will welcome every child she learns with a sincere smile. Children are coming to study with Selena! Teacher Selena can teach all levels of VIPKID.',
    },
    {
        href:'http://usc.edu',
        title:'More experience equals more opportunity',
        description:'Mr. Chantal is from Canada, graduated from the University of Ottawa, has a master\'s degree in education, and studied at Oxford University for one year. She is eager to join VIPKID and provide ESL instruction for her children. Chantal has extensive teaching experience and since 2010 has taught English, Fine Arts and Music courses for students in grades 7-12. In 2008, the teacher taught a three-week English course in Xichang, China. The teacher likes to go to Disney to play, bake, read, and enjoy music. Children are coming to study with Teacher Chantal! Teacher Chantal can teach all levels of VIPKID.',
    },
    {
        href:'http://usc.edu',
        title:' Speaking of which…you’re already in serious demand',
        description:'Mr. Logan is from the United States and graduated from Harvard University with a master\'s degree. He was the CEO of Quasar International. Prior to that, he served in the military, co-founded the Center of Mass, and represented North America at the World Economic Forum. Logan believes that family members can greatly help children learn a second language. Logan is looking forward to seeing everyone in the VIPKID class. He is able to teach all levels of VIPKID. Students come to join his class and learn English together!',
    },
    {
        href:'http://usc.edu',
        title:'A casual dress code, all day, every day',
        description:'Mr. Jeremy is from the United States and graduated from the University of Minnesota with a bachelor\'s degree in journalism and a relevant teaching certificate. Jeremy has been teaching English for 6 years now and is teaching students of all ages, including online and offline. Jeremy likes to travel and do sports with friends in his spare time Jeremy is willing to use 100% of her efforts to provide a fun and memorable experience for every child. Let the children come to class! Jeremy can teach all levels of VIPKID.',
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
                                        avatar={<Avatar src="" />}
                                        title={<a href="https://usc.edu">{item.title}</a>}
                                        description={item.description}
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
                                pageSize: 3,
                            }}
                            dataSource={listData}
                            renderItem={item => (
                                <List.Item
                                    key={item.title}
                                    actions={[
                                        <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                                        <IconText type="like-o" text="10" key="list-vertical-like-o" />,
                                        <IconText type="message" text="2" key="list-vertical-message" />,
                                    ]}
                                    extra={
                                        <img
                                            width={272}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        />
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}
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

export default BroughtCourse;