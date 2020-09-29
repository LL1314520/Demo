import React from 'react';

import {Card, Icon, LocaleProvider, Menu, Modal} from 'antd';
import {Link} from 'react-router-dom';
import BreadcrumbCustom from './BreadcrumbCustom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import '../assets/css/common.scss'
import '../assets/css/page/home-wrap.scss'
import '../assets/css/trainee/trainee-wrap.scss'

import {App} from '../common'
import {Footer, Header} from "./Comps";

const SubMenu = Menu.SubMenu;

export default class TraineeWrap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    logout = () => {
        Modal.confirm({
            title: '确定要退出吗?',
            content: null,
            onOk() {
                App.logout();
                App.go('/');
            },
            onCancel() {
            },
        });
    };

    render() {
        return <LocaleProvider locale={zhCN} style={{height: '100%'}}>
            <div className='home-wrap trainee-wrap'>
                <Header/>

                <div className='inner-content'>
                    <div className='left-menu'>

                        <Menu mode='inline' theme='dark'>
                            <Menu.Item>
                                <Link to={'/trainee/profile'}><Icon type="home"/><span
                                    className="nav-text">个人中心</span></Link>
                            </Menu.Item>
                            <SubMenu title={<span><Icon type="file-pdf"/>我的课程</span>}>
                                <Menu.Item>学习进度</Menu.Item>
                                <Menu.Item>我的收藏</Menu.Item>
                            </SubMenu>
                            <SubMenu title={<span><Icon type="schedule"/>我的课表</span>}>
                                <Menu.Item>课表</Menu.Item>
                            </SubMenu>

                            <Menu.Item>
                                <a onClick={this.logout}><Icon type="logout"/><span
                                    className="nav-text">注销</span></a>
                            </Menu.Item>
                        </Menu>

                    </div>
                    <Card
                        title={<BreadcrumbCustom
                            first={<Link to={'/trainee/profile'}>个人中心</Link>}/>}
                        className='main-content'>
                        {this.props.children}
                    </Card>
                </div>
                <Footer/>
            </div>
        </LocaleProvider>
    }
}
