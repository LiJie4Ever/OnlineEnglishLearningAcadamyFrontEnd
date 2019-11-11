import React from "react";
import "./index.css"
import 'antd/dist/antd.css';
import { List, Avatar, Skeleton, Button } from 'antd';

const data = [
    {
        title: 'TOEFL No Brainer - Speaking',
        tutor: 'Jack Ber',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/Jeremy_548a87ab.png',
        price: 49.99
    },
    {
        title: 'TOEFL No Brainer - Writing',
        tutor: 'Martin D. D',
        avatar: 'https://s.vipkidstatic.com/fe-static/parent/panda/web/plugs/teachersbanner/img/people/LoganM_be634aab.png',
        price: 49.99
    }
];

class Cart extends React.Component {
    remove = (index) => {
        this.setState(data.splice(index, 1));
    };

    getSummary = () => {
        var sum = {
            cost: 0,
            tax: 0,
            total: 0,
        }

        for (var i = 0; i < data.length; i++){
            sum.cost += data[i].price;
        }
        sum.cost = sum.cost.toFixed(2);
        sum.tax = (sum.cost * 0.15).toFixed(2);
        sum.total = (parseFloat(sum.cost) + parseFloat(sum.tax)).toFixed(2)


        return sum;
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
                                actions={[
                                    <Button onClick={() => this.remove(data.indexOf(item))}>remove</Button>
                                ]}
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