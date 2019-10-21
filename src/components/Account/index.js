import React from 'react';
import 'antd/dist/antd.css';
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
const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    href: 'http://usc.edu',
    title: `purchased courses ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Tutoring sessions are customized to meet identified learning objectives and areas for enrichment. Most importantly, our tutors use the most progressive and creative methods of instruction, utilizing a variety of supplemental resources and technology, to increase a student’s self-worth, personal development and joy.',
 });
}
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Courses extends React.Component {
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
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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

export default  Courses;