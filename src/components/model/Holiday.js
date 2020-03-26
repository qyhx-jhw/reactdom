import React, { Component } from 'react';

import { Comment, Avatar, Form, Button, List, Input, Badge } from 'antd';
import moment from 'moment';
const { TextArea } = Input;
// const colors = [
//     'red',
//     'green',
//     'blue',
// ];
const colors = {
    'red':'未通过申请',
    'green':"通过申请",
    'blue':"申请审核中",
};
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}//数据源
        header={`${comments.length} ${comments.length > 1 ? 'replies条' : 'reply条'}`}//头部
        itemLayout="horizontal"//横竖排列布局
        renderItem={props => <Comment {...props} />}
        split='true'
    />

);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                提交申请
        </Button>
        </Form.Item>
    </div>
);
class Holiday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            comments: [
                {
                    author: '蒋浩文',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    // content: <p>{this.state.value}</p>,
                    content: <p>我今天家里有事请假</p>,
                    datetime: moment().fromNow(),

                },
                {
                    author: '蒋浩文',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    // content: <p>{this.state.value}</p>,
                    content:
                        <div>
                        <p>我今天家里有事请假111</p>
                         <Badge color={"blue"} text={colors.blue} />
                        </div>
                    ,
                    datetime: moment().fromNow(),
                },
            ],
            submitting: false,
            value: '',
        }

    }
    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: '蒋浩文',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>
                            {this.state.value}
                            <div>
                                <Badge color={"blue"} text={colors.blue} />
                            </div>
                        </p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const { comments, submitting, value } = this.state;
        return (
            <div>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </div>
        );
    }
}

export default Holiday;