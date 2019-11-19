import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Col, Layout, Row} from 'antd';
import { Carousel } from 'antd';
import { List, Card } from 'antd';


const { Header, Footer, Content } = Layout;

function WelcomeSlider(){
    return (
        <Carousel autoplay>
            <div>
                <img className="WelcomePicContainer"
                     src="https://66.media.tumblr.com/92ba6aa44457b2e298b0da231f414c72/tumblr_inline_ptmikgMJBL1rjic88_1280.jpg"
                 />
            </div>
            <div>
                <img className="WelcomePicContainer"
                     src="https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Freignoftroy.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2016%2F04%2F1172602027.jpeg&c=sc&w=736&h=485"
                />
            </div>
            <div>
                <img className="WelcomePicContainer"
                     src="https://www.insidehighered.com/sites/default/server_files/media/2015105_USC_Spring_2015_1529_0.jpg"
                 />
            </div>
            <div>
                <img className="WelcomePicContainer"
                     src="https://housing.usc.edu/wp-content/uploads/2013/06/UV-Panorama-x2.jpg"
                 />
            </div>

         </Carousel>
    );
}

class landing extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header>Online English Academy</Header>
                    <Content>
                        <WelcomeSlider />
                    </Content>
                    <div style={{textAlign: 'center',background:'white'}}>
                        <div style={{fontSize:'40px',fontFamily:"Times New Roman"}}>Dive Into Our Website</div>
                         Our experience with teaching went above and beyond all our tutoring expectations and would highly recommend our service!
                    </div>
                    <Footer>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card title="PROGRAM" bordered={false}  extra={<a href="http://www.usc.edu">More</a>} style={{ width: 320, height:600, background:'rgb(254,243,242)'}}
        cover={<img alt="example" src="data:image/jpeg;base64,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" />}>
Our homeschool approach is a successful combination of personalized curriculum, hand-picked teachers and interactive lessons. We recognize that there are different types of learners and there is not a one size fits all learning environment. In many traditional classrooms, it is often challenging to teach to each student’s learning style. In one-on-one, personalized homeschool setting.       </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="OUTCOME" bordered={false}  extra={<a href="#">More</a>} style={{ width: 320, height:600 ,background:'rgb(=)'}}
        cover={<img alt="example" src="data:image/jpeg;base64,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" />}>
Not located in Los Angeles, but still want to take part in amazing learning opportunities? The beauty of technology has allowed us to reach students all over the world, whether they live elsewhere or are traveling for periods of time. Join us online for live group classes or one-on-one tutoring. We will bring the learning to you!         </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="TEAM" bordered={false}  extra={<a href="#">More</a>} style={{ width: 320, height:600,background:'rgb(254,243,242)' }}
        cover={<img alt="example" src="data:image/jpeg;base64,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" />}>
            Our educators promote self-advocacy in our students, giving them the confidence and multitude of strategies to become successful, independent learners. By encouraging growth in communication and increased confidence, students learn to communicate with teachers in an effective way, gaining clarity in their studies, and promoting accountability. Our tutoring philosophy is based on developing a positive, respectful, and trusting relationship with our students and families.         </Card>
                            </Col>
                        </Row>
                    </Footer>
                    <div style={{textAlign: 'center',background:'white'}}>
                        <div style={{fontSize:'40px',fontFamily:"Times New Roman"}}>Learn From Our Customer</div>
                    </div>
                    <Footer style={{color:'black',background:'white'}}>
                        “I have twin boys who are currently enrolled in a LAUSD high school. Prior to being introduced to Online English Language Academy, our home would become a battleground when it was time to do homework. My sons were not receiving enough instruction at school and were often feeling frustration and confusion around the curriculum. I cannot say enough good things in regard to the incredibly mindful process of Aspen Learning – from the exploratory testing to discover what type of learner your child is, to meeting with Kelsey who is obviously passionate about her product, to matching your child with a tutor who is the best fit for him/her, to consistent follow up with both the parent and tutor and lastly, to inspiring your child to want to learn on their own. Our experience with Aspen Learning went above and beyond all our tutoring expectations and I would highly recommend their services. With great appreciation”
                    </Footer>
                    <div style={{textAlign:'center',fontSize:'bold',color:'black'}}><br/>
                    COPYRIGHT©USC CSCI577A TEMA #2
                    </div>
                </Layout>
            </div>
        );
    }
}
export default  landing;
