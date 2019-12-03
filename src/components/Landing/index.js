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
                        <div style={{fontSize:'40px',fontFamily:"sans-serif",fontWeight:'600'}}>Dive Into Our Website</div>
                        <div className='diveInto'>
                            Our experience with teaching went above and beyond all our tutoring expectations and would highly recommend our service!<br/><br/>
                            We all remember our favorite teacher, and that’s because research shows how great an impact a great teacher can have on student achievement. That's why at Revolution Prep we have the only full-time faculty in the business. Our expert tutors have dedicated their careers to improving scores, lowering stress, and building confidence.<br/><br/>
                            And with our convenient online platform, we can match your family with the absolute best tutors in the country...not just the best tutor in your neighborhood.
                        </div>
                        <div >
                            <img className='pic1' src='https://imgs.hellokid.com/20191010/features4.jpg'/>
                        </div>
                    </div>
                    <Footer>
                        <Row gutter={16}>
                            <Col span={8}>
<Card title="Our Program" bordered={false}  className={"infoCard"}>
    Our homeschool approach is a successful combination of personalized curriculum, hand-picked teachers and interactive lessons.</Card>
                            </Col>
                            <Col span={8}>
<Card title="Our Advantage" bordered={false}  className={"infoCard"}>
The beauty of technology has allowed us to reach students all over the world, whether they live elsewhere or are traveling for periods of time. </Card>
                            </Col>
                            <Col span={8}>
<Card title="Our Outcomes" bordered={false}  className={"infoCard"}>
    Our educators promote self-advocacy in our students, giving them the confidence and multitude of strategies to become successful, independent learners. </Card>
</Col>
                        </Row>
                    </Footer>
                    <div className='LearnFrom'>Better Grades.<br/>Higher Scores.<br/>Lower Stress.</div>
                    <div className='letter'>
                        “I have twin boys who are currently enrolled in a LAUSD high school. Prior to being introduced to Online English Language Academy, our home would become a battleground when it was time to do homework.
                        <br/><br/>My sons were not receiving enough instruction at school and were often feeling frustration and confusion around the curriculum. I cannot say enough good things in regard to the incredibly mindful process of Online English Learning – from the exploratory testing to discover what type of learner your child is, to meeting with Kelsey who is obviously passionate about her product,
                        to matching your child with a tutor who is the best fit for him/her, to consistent follow up with both the parent and tutor and lastly, to inspiring your child to want to learn on their own. <br/>
                        <br/>Our experience with Online English Learning went above and beyond all our tutoring expectations and I would highly recommend their services. With great appreciation.”
                    </div>
                    <img className='pic2' src='http://clipart-library.com/images/8iEjzEBaT.jpg'/><hr/>
                    <div style={{fontSize:'40px',fontFamily:"sans-serif",fontWeight:'600',textAlign:'center',marginTop:'40px'}}>Our Teams</div>
                    <img className='picClient' src={'https://web-app.usc.edu/web/rossier/photos/Rob_Filback_usc_rossier_phd.jpg'}/>
                    <div className={'client1'}><h1>Rob Filback, PhD</h1> is professor of clinical education and chair of the Master of Arts in Teaching English to Speakers of Other Languages (MAT—TESOL) program. His areas of focus include international education, language teacher preparation, online and technology enhanced learning and creativity and innovation in education.</div>
                    <img className='picClient2' src={'https://greenbay.usc.edu/csci577/fall2019/projects/team02/assets/img/photo_liyan.jpg'}/>
                    <div className={'client1'}><h1>Liyan Wang, Lecturer</h1> is lecturer of clinical education and chair of the Master of Arts in Teaching English to Speakers of Other Languages (MAT—TESOL) program. His areas of focus include international education, language teacher preparation, online and technology enhanced learning and creativity and innovation in education.</div>
                    <div className={'copyright'} style={{textAlign:'center',fontSize:'bold',color:'black'}}>
                    COPYRIGHT©USC CSCI577A TEAM #2
                    </div>
                </Layout>
            </div>
        );
    }
}
export default  landing;
