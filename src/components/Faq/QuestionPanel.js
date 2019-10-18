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
            <div>
                <Collapse defaultActiveKey={['1']} onChange={callback}>
                    <Panel header="这个课程好吗" key="1">
                        <Comment
                            author={<a>Child Jie Li</a>}
                            avatar={
                                <Avatar
                                    src={head}
                                    alt="Child Jie Li"
                                />
                            }
                            content={
                                <p>
                                   别问，买就完事了
                                </p>
                            }
                            datetime={
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment().fromNow()}</span>
                                </Tooltip>
                            }
                        />
                    </Panel>
                    <Panel header="This is Question 2" key="2">
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
                                    We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.
                                </p>
                            }
                            datetime={
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment().fromNow()}</span>
                                </Tooltip>
                            }
                        />
                    </Panel>
                    <Panel header="This is panel header 3" key="3" disabled>
                    </Panel>
                </Collapse>,
            </div>
        )
    }
}

export default QuestionPanel;