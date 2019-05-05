import React from 'react';
import { NavBar, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
class BasicInputExample extends React.Component {
    submit () {
        console.log(this.props.form)
        const { resetFields } = this.props.form;
        resetFields()
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
                    {...getFieldProps('focus')}
                    clear
                    placeholder="click the button below to focus"
                    ref={el => this.inputRef = el}
                >标题</InputItem>
                <Button onClick={() => this.submit()}>default</Button>
            </div>

        )
    }
}
const BasicInputExampleWrapper = createForm()(BasicInputExample);
console.log(BasicInputExampleWrapper)

export default class Login extends React.Component {
    render () {
        return (
            <BasicInputExampleWrapper />
        )
    }
}