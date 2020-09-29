import React from 'react'
import U from "../../common/U";
import {App, CTYPE, Utils} from "../../common/index";
import {Banners, CourseChapters} from "../Comps";
import {Icon} from 'antd';
import '../../assets/css/page/java-primary.scss'


const features = [{title: '语言稳定', descr: '完善的字节码安全机制，可靠的异常处理'}, {title: '高性能', descr: '字节码的设计很容易地直接转换成较高的性能机器码'}, {
    title: '从业人数多',
    descr: '最多人群学习的语言，高薪且长年居于语言排行榜首位'
}, {
    title: '生态好',
    descr: '生态圈丰富，众多免费开源技术框架、中间件、系统架构及经典案例等'
}, {title: '简单性', descr: '语法简捷，自动化内存管理，跨平台可移植'}, {title: '高并发', descr: '分布式语言，跨平台高并发，高性能互联网架构不二之选'}, {
    title: '面向对象',
    descr: '面向对象的语言，始终关注应用中数据和操纵数据的算法'
}];

const courseSystem = ['Java基础知识', '数据库+缓存', 'Html5+CSS3+JS', '工具', '实战阶段', '就业指导'];

const teachingSystem = [{t: '学习氛围浓厚', c: '#42DCCB', i: require('../../assets/image/java/icon_teach_sys_1.png')}, {
    t: '每日自习辅导',
    c: '#1F4FDF',
    i: require('../../assets/image/java/icon_teach_sys_2.png')
}, {t: '360度生活照顾', c: '#A54BF2', i: require('../../assets/image/java/icon_teach_sys_3.png')}, {
    t: '定位末位辅导',
    c: '#FF4568',
    i: require('../../assets/image/java/icon_teach_sys_4.png')
}, {t: '集体作业点评', c: '#04D5FD', i: require('../../assets/image/java/icon_teach_sys_5.png')}, {
    t: '及时教学反馈',
    c: '#FF4568',
    i: require('../../assets/image/java/icon_teach_sys_6.png')
}, {t: '教学保障系统', c: '#04D5FD', i: require('../../assets/image/java/icon_teach_sys_7.png')}, {
    t: '系统职业测评',
    c: '#42DCCB',
    i: require('../../assets/image/java/icon_teach_sys_8.png')
}, {t: '就业指导服务', c: '#1F4FDF', i: require('../../assets/image/java/icon_teach_sys_9.png')}, {
    t: '综合能力评定',
    c: '#A54BF2',
    i: require('../../assets/image/java/icon_teach_sys_10.png')
}];

const bannerType = CTYPE.bannerTypes.JAVA_PRY;

export default class JavaPrimary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            banners: [],
            schedules: [{course: 'Java就业班', startAt: 1562688000000, status: 1, addr: '郑州市新郑市'}, {
                course: 'Java就业班',
                startAt: 1568044800000,
                status: 1,
                addr: '郑州市新郑市'
            }, {course: 'Java就业班', startAt: 1575936000000, status: 1, addr: '郑州市新郑市'}]
        };
        this.timerInterval = null;
    }

    componentDidMount() {
        U.setWXTitle('Java就业班');
        this.loadData();
        this.startTimer();
    }

    loadData = () => {
        App.api('/ws/home/course', {id: 1}).then((course) => {
            this.setState({course});
        });

        App.api('/ws/home/banners', {bannerQo: JSON.stringify({type: bannerType})}).then((banners) => {
            this.setState({banners});
        });
    };

    startTimer = () => {
        let {schedules = []} = this.state;
        this.setState({
            timerInterval: window.setInterval(() => {

                schedules.map((item, index) => {
                    let diff = (item.startAt - new Date().getTime()) / 1000;
                    let timers;
                    if (diff <= 0) {
                        timers = [0, 0, 0, 0];
                        clearInterval(this.timerInterval);
                    } else {
                        timers = U.date.countdownTimers(diff);
                    }
                    item.timers = timers;
                });

                this.setState({schedules});

            }, 1000),
        });
    };

    render() {

        let {course = {}, banners = [], schedules = []} = this.state;

        return <div className='java-primary-page'>

            {banners.length > 0 && <Banners banners={banners} bannerType={bannerType}/>}

            <div className='page-block schedule'>

                <div className='inner'>

                    <div className='f-title'>开班时间表</div>
                    <div className='s-title'>可根据以下时间表，合理安排自己的学习时间，时间就像海绵，挤一挤总会有的</div>

                    <table>
                        <tbody>
                        <tr>
                            <th>课程</th>
                            <th>时间</th>
                            <th>状态</th>
                            <th style={{width: '360px'}}>倒计时</th>
                            <th>地点</th>
                            <th style={{width: '170px'}}>预约</th>
                        </tr>

                        {schedules.map((item, index) => {
                            let {course, startAt, status, addr, timers = [0, 0, 0, 0]} = item;
                            return <tr key={index}>
                                <td>{course}</td>
                                <td>{U.date.format(new Date(startAt), 'yyyy-MM-dd')}</td>
                                <td>{status === 1 ?
                                    <span>火爆报名中<Icon type='fire' style={{color: 'red'}}/></span> : '已结束'}</td>
                                <td>
                                    <div className='timeout'>
                                        <div className='label'>{U.date.pad(timers[0])}</div>
                                        <div className='txt'>天</div>
                                        <div className='label'>{U.date.pad(timers[1])}</div>
                                        <div className='txt'>时</div>
                                        <div className='label'>{U.date.pad(timers[2])}</div>
                                        <div className='txt'>分</div>
                                        <div className='label'>{U.date.pad(timers[3])}</div>
                                        <div className='txt'>秒</div>
                                    </div>
                                </td>
                                <td>{addr}</td>
                                <td>
                                    <div className='btn'>在线报名</div>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>

                </div>

            </div>

            <div className='page-block why-java'>

                <div className='inner'>

                    <div className='f-title'>90%企业都选择的语言- -<b>Java</b></div>
                    <div className='s-title'>我们要做贴合市场需求的课程</div>

                    <div className='chart'>
                        {features.map((f, index) => {
                            let {title, descr} = f;
                            return <div key={index} className={`pop pop-${index}`}>
                                <div className='title'>{title}</div>
                                <div className='descr'>{descr}</div>
                            </div>

                        })}
                    </div>

                </div>
            </div>

            <div className='page-block industry'>

                <div className='inner'>

                    <div className='f-title'>紧跟企业用人标准，不断优化高薪技能点</div>
                    <div className='s-title'>大型项目库，主流行业项目全覆盖，7大行业开发经验傍身，就业才有更多选择</div>

                    <div className='bg'/>

                    <div className='clearfix'/>

                </div>
            </div>

            <div className='page-block course-system'>
                <div className='inner'>

                    <div className='f-title'>一线教学团队精心打造，近乎完美的课程体系</div>
                    <div className='s-title'>5个月，110个课时，实现10w+代码，相当于1年开发经验，提升职场战斗力，助你成为不可替代的中高端 Java 人才</div>

                    <ul>
                        {courseSystem.map((c, i) => {
                            return <li key={i}>
                                <div className='bg'/>
                                <div className='info'>
                                    <div className='label'>阶段</div>
                                    <div className='num'>{i + 1}</div>
                                    <div className='txt'>{c}</div>
                                </div>
                            </li>
                        })}
                    </ul>

                </div>
            </div>


            <div className='page-block course-outline'>

                <div className='count-stat'>
                    <div className='stat-title'>高效保障学习</div>
                    <ul>
                        <li>
                            <div className='num'>5+1</div>
                            <div className='txt'>个月学习</div>
                        </li>
                        <li>
                            <div className='num'>110+</div>
                            <div className='txt'>面授课时</div>
                        </li>
                        <li>
                            <div className='num'>300+</div>
                            <div className='txt'>课下习题</div>
                        </li>
                        <li>
                            <div className='num'>1000+</div>
                            <div className='txt'>实战技巧</div>
                        </li>
                        <li>
                            <div className='num'>10W+</div>
                            <div className='txt'>编写代码</div>
                        </li>
                    </ul>

                </div>

            </div>

            <CourseChapters course={course}/>

            <div className='page-block teaching-system'>
                <div className='inner'>
                    <div className='f-title'>软硬双辅导教学体系</div>
                    <div className='f-title'>专为零基础的你设计</div>

                    <ul>
                        {teachingSystem.map((item, index) => {
                            let {t, c, i} = item;
                            return <li key={index}>
                                <div className='bg' style={{opacity: 0.1, background: c}}/>
                                <img src={i} className='icon'/>
                                <p>{t}</p>
                            </li>
                        })}
                    </ul>
                </div>
            </div>


            <div className='page-block step'>
                <div className='inner'>
                    <div className='f-title'>教学决定深度，经验决定高度</div>
                    <div className='s-title'>Java从业者职业生涯规划</div>

                    <div className='btn' onClick={() => Utils.namecard.show()}>咨询一下你适合哪个方向</div>

                </div>
            </div>

            <div className='page-block salary'>
                <div className='inner'>
                    <div className='f-title'>行业薪资分析与状态</div>
                    <div className='s-title'>数据来源于第三方专业统计</div>

                    <div className='img'/>

                </div>
            </div>


        </div>
    }
}

