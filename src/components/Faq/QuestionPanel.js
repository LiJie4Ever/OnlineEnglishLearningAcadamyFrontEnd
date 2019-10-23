import React, { Component } from 'react';
import { Comment, Tooltip, Avatar, Collapse } from 'antd';
import head from '../../images/profile.jpeg';
import moment from 'moment';

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
}

class QuestionPanel extends Component {
    constructor(pros) {
        super(pros);
    }

    render() {
        return(
            <div style={{textAlign: 'left'}}>
                <Collapse defaultActiveKey={['1']} onChange={callback}>
                    <Panel header="How do I schedule a live session only with the tutor I want?" key="1">
                        <Comment
                            author={<a>Jie Li</a>}
                            avatar={
                                <Avatar
                                    src={head}
                                    alt="Jie Li"
                                />
                            }
                            content={
                                <p>
                                    In request form, you can choose select your desired tutor in "preferred tutor" section.
                                </p>
                            }
                            datetime={
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment().fromNow()}</span>
                                </Tooltip>
                            }
                        />
                    </Panel>
                    <Panel header="What kinds of study resources does Online English Language Academy offer?" key="2">
                        <Comment
                            author={<a>Han Solo</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <p>
                                    Course Hero provides a variety of learning resources to help students study more effectively and succeed in their courses,
                                    including one to one online live tutoring sessions, online videos, study documents and more.
                                </p>
                            }
                            datetime={
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment().fromNow()}</span>
                                </Tooltip>
                            }
                        />
                    </Panel>
                </Collapse>,
            </div>
        )
    }
}

export default QuestionPanel;