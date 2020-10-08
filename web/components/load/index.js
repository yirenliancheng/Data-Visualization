import React from "react";
import { Button, Modal, Form, Checkbox, Input } from "antd";
import "antd/dist/antd.css";
import "./index.less";

export default class Load extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
    };

    handleOk = (e) =>{
        console.log(e);
        this.setState({
            visible: false,
          });
    }

    handleCancel = (e) =>{
        console.log(e);
        this.setState({
            visible: false,
          });
    }

    onFinish = (e) =>{
        console.log(e);
    }

    onFinishFailed = (e) =>{
        console.log(e);
    }

    render(){
        return(
            <>
              <Button type='text' onClick={this.showModal}>
                  登录
              </Button>
              <Modal
                title="经编MES系统"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Form
                  name="loadInformation"
                  initialValues={{ remember: true }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                   <Form.Item
                     label='用户名'
                     name='username'
                     rules={[
                         {
                             required:true,
                             message:'请输入用户名!'
                         }
                     ]}
                   >
                        <Input />
                   </Form.Item>
                   <Form.Item
                      label="密码"
                      name="password"
                      rules={[
                          {
                            required: true,
                            message: '请输入密码!',
                          },
                      ]}
                   >
                       <Input.Password />
                   </Form.Item>
                   <Form.Item name="remember" valuePropName="checked">
                       <Checkbox>记住信息</Checkbox>
                   </Form.Item>
                </Form>
              </Modal>
            </>
        );
    }
}