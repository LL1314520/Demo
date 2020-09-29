import React from 'react';
import {Button, Form, Input, message, Radio} from 'antd';
import {App, CTYPE, U} from "../../common";
import '../../assets/css/login.scss'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class ResetPwdForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {key: new Date().getTime()};
    }

    componentDidMount() {
        document.addEventListener('keydown', this.doSubmit);
        this.setForm({});
    }

    setForm = (user) => {
        let {code, accountType = 1, account, password} = user;
        this.props.form.setFieldsValue({
            code, accountType, account, password
        });
    };

    doSubmit = (e) => {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this.doSubmit);
    }

    submit = () => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                Object.keys(err).forEach(key => {
                    message.warning(err[key].errors[0].message);
                });
            } else {


                let {code, accountType, account, password} = values;

                if (accountType === 1) {
                    if (!U.str.isEmail(account)) {
                        message.warn('请输入正确的邮箱');
                        return;
                    }
                } else {
                    if (!U.str.isChinaMobile(account)) {
                        message.warn('请输入正确的手机号');
                        return;
                    }
                }

                let {key} = this.state;
                App.api('trainee/trainee/reset_my_password', {
                    valCode: JSON.stringify({
                        key, userType: 2, code, accountType, account
                    }), password
                }).then(() => {

                    message.success('重置成功');
                    setTimeout(() => {
                        App.go('/login');
                    }, 1000);

                })
            }
        })
    };

    genValCode = () => {
        let {accountType, account} = this.props.form.getFieldsValue();

        if (accountType === 1) {
            if (!U.str.isEmail(account)) {
                message.warn('请输入正确的邮箱');
                return;
            }
        } else {
            if (!U.str.isChinaMobile(account)) {
                message.warn('请输入正确的手机号');
                return;
            }
        }

        let key = new Date().getTime();
        App.api('common/gen_valCode_reset_pwd', {
            valCode: JSON.stringify({key, userType: 2, accountType, account})
        }).then(() => {
            message.info('验证码已发送,请查收');
            this.setState({key});
        });
    };

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;

        let accountType = getFieldValue('accountType');

        let isEmail = accountType === 1;

        return <div className="login-page">

            <div className='logo'/>

            <div className="login-form">

                <div className='header'>
                    <p>重置密码</p>
                    <a onClick={() => App.go('login')}>登录></a>
                </div>

                <FormItem
                    {...CTYPE.dialogItemLayout}
                    label="找回途径">
                    {getFieldDecorator('accountType')(
                        <RadioGroup>
                            <Radio value={1}>邮箱</Radio>
                            <Radio value={2}>手机</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                    {...CTYPE.dialogItemLayout}
                    label={isEmail ? "邮箱地址" : "手机号码"}>
                    {getFieldDecorator('account')(
                        <div>
                            <Input style={{width: '160px'}}/>
                            <Button type='primary' style={{float: 'right', height: '45px'}}
                                    onClick={this.genValCode}>获取验证码</Button>
                        </div>
                    )}
                </FormItem>
                <FormItem
                    {...CTYPE.dialogItemLayout}
                    label='验证码'>
                    {getFieldDecorator('code', {rules: [{required: true, message: '请输入验证码'}]})(
                        <Input placeholder="验证码" style={{width: '160px'}}/>
                    )}
                </FormItem>

                <FormItem
                    {...CTYPE.dialogItemLayout}
                    label="新密码">
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入新密码'}],
                    })(
                        <Input type='password'/>
                    )}
                </FormItem>

                <FormItem>
                    <div className='btn' onClick={this.submit}>重置密码</div>
                </FormItem>
            </div>

        </div>

    }
}

const ResetPwd = Form.create()(ResetPwdForm);
export default ResetPwd;
