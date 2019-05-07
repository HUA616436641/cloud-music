import React from 'react';
import { NavBar, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import './login.css';
import { user } from './api'
import { withRouter } from 'react-router'; 

class BasicInputExample extends React.Component {
    submit () {
        const { getFieldsValue } = this.props.form;
        let params = getFieldsValue()
        user.login(params).then(res => { 
            if (res.code === 200) {
                console.log(this)
                this.props.history.push('/home')
            }
        })

    }
    render () {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <NavBar
                    mode="light"
                    // icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                // rightContent={[
                //     <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                //     <Icon key="1" type="ellipsis" />,
                // ]}
                >手机号登录</NavBar>
                <InputItem
                    {...getFieldProps('phone', { initialValue: 13750523023 })}
                    clear
                    placeholder="请输入手机号"
                    ref={el => this.inputRef = el}
                    className="mobile"
                >+86</InputItem>
                <InputItem
                    {...getFieldProps('password', { initialValue: 'cf87595895' })}
                    clear
                    placeholder="请输入密码"
                    type="password"
                    ref={el => this.inputRef = el}
                    className="password"
                ></InputItem>
                <Button className="btn-login" onClick={() => this.submit()}>登录</Button>
            </div>

        )
    }
}
const BasicInputExampleWrapper = withRouter(createForm()(BasicInputExample));

export default class Login extends React.Component {
    render () {
        return (
            <BasicInputExampleWrapper />
        )
    }
}