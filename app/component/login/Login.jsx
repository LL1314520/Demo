import React from 'react';
import {Form, Icon, Input, message, Modal} from 'antd';
import KvStorage from "../../common/KvStorage";
import {App, Utils} from "../../common";
import '../../assets/css/login.scss'

const FormItem = Form.Item;

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            img_src: '',
            valCode: {key: 0, code: ''}
        };
    }

    isIE = () => { //ie?
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            return true;
        else
            return false;
    };

    componentDidMount() {

        this.genValCode();
        //未授权从index被拦截回login时清除loading效果
        message.destroy();

        if (this.isIE()) {
            Modal.warning({
                title: '提示',
                content: (<div>
                    <p>你正在使用的浏览器内核版本过低，微软已经不再提供技术支持，为避免可能存在的安全隐患，请尽快升级你的浏览器或者安装更安全的浏览器（比如 <a
                        href='http://www.google.cn/chrome/browser/desktop/index.html' target='_blank'>Chrome</a>）访问。
                    </p>
                    <p>如果你正在使用的是双核浏览器，比如QQ浏览器、搜狗浏览器、猎豹浏览器、世界之窗浏览器、傲游浏览器、360浏览器等，可以使用浏览器的极速模式来继续访问管理平台。</p></div>),
            });
        }

        document.addEventListener('keydown', this.doSubmit);


    }

    doSubmit = (e) => {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this.doSubmit);
    }

    onSubmit = () => {
        this.props.form.validateFields((err, trainee) => {
                if (err) {
                    Object.keys(err).forEach(key => {
                        message.warning(err[key].errors[0].message);
                    });
                } else {
                    let {valCode = {}} = this.state;
                    App.api('trainee/trainee/signin', {
                            trainee: JSON.stringify(trainee), valCode: JSON.stringify(valCode)
                        }
                    ).then(res => {

                        let {trainee = {}, session = {}} = res;

                        KvStorage.set('trainee-profile', JSON.stringify(trainee));
                        KvStorage.set('trainee-token', session.token);

                        App.go('/trainee/profile');

                    })
                }
            }
        );
    };

    genValCode = () => {
        let key = new Date().getTime();
        this.setState({
            img_src: App.API_BASE + '/common/gen_valCode_signin?key=' + key,
            valCode: {key, code: ''}
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        let {img_src, valCode = {}} = this.state;
        let {code = ''} = valCode;

        return <div className="login-page">

            <div className='logo'/>

            <div className="login-form">

                <div className='header'>
                    <p>学员登录</p>
                    <a onClick={() => Utils.namecard.show()}>报名咨询></a>
                </div>

                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入账号!'}],
                    })(
                        <Input addonBefore={<Icon type="user" style={{fontSize: 13}}/>}
                               placeholder="请输入账号" className='input'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input addonBefore={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="请输入密码" className='input'/>
                    )}
                </FormItem>

                <FormItem>
                    <Input value={code} addonBefore={<Icon type="property-safety" style={{fontSize: 13}}/>}
                           placeholder="验证码" style={{width: '300px'}} onChange={(e) => {
                        this.setState({
                            valCode: {
                                ...valCode,
                                code: e.target.value
                            }
                        })
                    }}/>
                    <img src={img_src} onClick={this.genValCode}/>
                </FormItem>

                <FormItem>
                    <a className='a-reset-pwd' onClick={() => App.go('reset-pwd')}>忘记密码</a>
                </FormItem>

                <FormItem>
                    <div className='btn' onClick={this.onSubmit}>登录</div>
                </FormItem>

            </div>
        </div>
    }
}

const login = Form.create()(Login);
export default login;
