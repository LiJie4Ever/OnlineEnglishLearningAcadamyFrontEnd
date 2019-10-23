import React from "react";
import "./index.css"
import 'antd/dist/antd.css';
import { List, Avatar, Skeleton, Button } from 'antd';

const data = [
    {
        title: 'TOEFL No Brainer - Listening',
        tutor: 'Lisa Brian',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/KaitlynM_e13daf1e.png',
        price: 49.99
    },
    {
        title: 'TOEFL No Brainer - Reading',
        tutor: 'Tommy Chen',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/DerekT_74d615e5.png',
        price: 49.99
    }
];

class Cart extends React.Component {
    removeItem(){

    }

    getSummary(){
        var sum = {
            cost: 0,
            tax: 0,
            total: 0
        }

        for (var i = 0; i < data.length; i++){
            sum.cost += data[i].price
        }
        sum.tax = Math.round((sum.cost * 0.15) * 100) / 100
        sum.total = Math.round((sum.cost + sum.tax) * 100) / 100


        return sum
    }

    render() {
        return (
            <div>
                <div className="left">
                    <h1>Items</h1>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item
                                actions={[<a onClick={this.removeItem}>remove</a>]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar className='img' src={item.avatar} />
                                        }
                                        title={<a href="/">{item.title}</a>}
                                        description={item.tutor}
                                    />
                                    <div>US$ {item.price}</div>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>

                <div className="right">
                    <h1>Summary</h1>
                    <div className='box'>
                        <div className='summary-left'>Cost</div>
                        <div className='summary-right'>{this.getSummary().cost}</div>
                        <div className="clear"></div>

                        <div className='summary-left'>Tax</div>
                        <div className='summary-right'>{this.getSummary().tax}</div>
                        <div className="clear"></div>

                        <hr/>

                        <div className='summary-left'>Total</div>
                        <div className='summary-right'>{this.getSummary().total }</div>
                        <div className="clear"></div>
                    </div>

                    <Button className='button'>Check Out</Button>
                </div>

                <div className="clear"></div>
            </div>
        );
    }
}

export default Cart;