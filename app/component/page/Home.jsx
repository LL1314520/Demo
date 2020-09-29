import React from 'react'
import U from "../../common/U";
import {App, CTYPE} from "../../common/index";
import {Banners, FreeBar, TrainingProject} from "../Comps";
import {Carousel, Col, Row} from 'antd'

import '../../assets/css/page/home.scss'

const salary = [{title: '北京1年经验Java 工程师就业薪资', max: 12000, avg: 9000}, {
    title: '上海1年经验Java 工程师就业薪资',
    max: 13000,
    avg: 10000
}, {title: '深圳1年经验Java 工程师就业薪资', max: 12000, avg: 9000}, {title: '杭州1年经验Java 工程师就业薪资', max: 13000, avg: 8000}];

const crowd = [{title: '刚毕业，未来迷茫', descr: '大学刚毕业，迷茫群体，看不到未来的方向，期待学一门有前景的技术'}, {
    title: '跨专业转行',
    descr: '非计算机专业迫切要转行群体，期待学一门靠谱、有前景、易学的技术'
}, {
    title: '0基础，逻辑思维能力强', descr: '逻辑思维能力很强想通过学一门技术来获得工作能力'
}, {
    title: '有基础，想突破自己',
    descr: '有一定的工作经验，但是工作中工作内容零碎，并未接触过大型或完整项目，技术得不到提升'
}, {title: '理科毕业', descr: '学过数学、大数据收集或分析、统计学、物理学等，通过英语4级是学这门课的合适人选'}, {
    title: '传统运维转开发',
    descr: '有软件开发流程相关经验，对当前技术栈不满足，期待学一门技术打破瓶颈，迈向企业解决解决方案之路'
}];

const feature = [{
    title: '小班教学面对面辅导',
    descr: '每班不超过20名学生。拒绝网络在线授课，名师面对面辅导，分阶段学习。讲师均来自国内前沿互联网公司的全栈工程师，具有10年以上的互联网开发经验。'
}, {
    title: '教学内容真实学习与工作无缝对接',
    descr: '在真实的工作环境模式下实战教学，让学生从学习到步入职场，可以轻松转变角色，让学习到工作无缝对接，避免初入职场时的尴尬与不知所措，真正的做到学以致用，落地入职。'
}, {title: '主流的技术、框架与工具', descr: '紧跟技术潮流，了解行业发展趋势，采用目前业内主流的技术、框架与工具，创新课程，让学员做到“无代差”就业。'}, {
    title: '就业指导，毕业后疑难问题解惑',
    descr: '模拟真实面试场景，一线互联公司的HR亲自提供面试技巧与就业指导，与学员建立良好关系，持续为毕业后步入职场的学生提供疑难问题解答。'
}, {title: '自主代码库', descr: '一线大型项目教学化拆分、整合，建立自主代码库，整合各行业经典案例，以及多年的技术沉淀，方便学员持续学习与参考，紧跟技术潮流。'}];

const bannerType = CTYPE.bannerTypes.HOME;

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            banners: [],
            card_index: 0
        }
    }

    componentDidMount() {
        U.setWXTitle('首页');
        this.loadData();
    }

    loadData = () => {
        App.api('/ws/home/home').then((data) => {
            this.setState({data})
        });

        App.api('/ws/home/banners', {bannerQo: JSON.stringify({type: bannerType})}).then((banners) => {
            this.setState({banners})
        });
    };

    render() {

        let {data = {}, banners = [], card_index} = this.state;

        let {articles = [], trainers = [], partners = []} = data;

        trainers = trainers.concat(...trainers);

        return <div className='home-page'>

            {banners.length > 0 && <Banners banners={banners} bannerType={bannerType}/>}

            <div className='page-block advantage'>
                <div className='inner'>
                    <div className='f-title'>凭什么说Java是全球第一编程语言？</div>
                    <div className='s-title'>
                        21年来，Java位列编程语言排行榜首位，拥有全球最大的开发者专业社群，Java技术稳居市场十多年，
                        在服务器端编程语言占比高达90%以上。由于Java语言安全、简洁、跨平台性等优势，其应用非常广泛，因此市场对Java人才的需求量也越来越大。据招聘网站数据统计，全国每周新增的java岗位就高达15万+个众多企业纷纷高薪争抢，发展前景不可估量，是学习编程语言的不二选择。
                    </div>

                    <ul className='stat'>
                        <li>
                            <div className='num'>NO.1</div>
                            <div className='descr'>21年来始终位列编程语言排行榜首位</div>
                            <div className='wave'>
                                <div className='w1'/>
                                <div className='w2'/>
                            </div>
                        </li>
                        <li>
                            <div className='num'>90%<em>以上</em></div>
                            <div className='descr'>服务端编程语言占比</div>
                            <div className='wave'>
                                <div className='w1'/>
                                <div className='w2'/>
                            </div>
                        </li>
                        <li>
                            <div className='num'>15000+</div>
                            <div className='descr'>全国每周新增岗位</div>
                            <div className='wave'>
                                <div className='w1'/>
                                <div className='w2'/>
                            </div>
                        </li>
                    </ul>


                    <div className='f-title'>为什么那么多人选择学习Java？</div>
                    <div className='s-title'>
                        高薪就业，只为成就更好的自己，有人毕业后月薪1.5W，有人毕业后月薪3000起，所以选对专业很重要
                    </div>

                    <ul className='salary-card'>
                        {salary.map((item, index) => {
                            let {title, max, avg} = item;
                            return <li key={index}>
                                <div className='bg'/>
                                <div className='info'>
                                    <div className='title'>{title}</div>
                                    <div className='half'>
                                        <p><b>{max}</b>元</p>
                                        <span>最高薪资</span>
                                    </div>
                                    <div className='half half-right'>
                                        <p><b>{avg}</b>元</p>
                                        <span>平均薪资</span>
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>

                </div>

            </div>

            <div className='page-block crowd'>
                <div className='inner'>
                    <div className='f-title'>什么样的人适合学习Java？</div>
                    <div className='s-title'>
                        21年来，Java位列编程语言排行榜首位，拥有全球最大的开发者专业社群，Java技术稳居市场十多年，
                        在服务器端编程语言占比高达90%以上。由于Java语言安全、简洁、跨平台性等优势，其应用非常广泛，因此市场对Java人才的需求量也越来越大。据招聘网站数据统计，全国每周新增的java岗位就高达15万+个众多企业纷纷高薪争抢，发展前景不可估量，是学习编程语言的不二选择。
                    </div>

                    <ul>
                        {crowd.map((item, index) => {
                            let {title, descr} = item;
                            return <li key={index}>
                                <div className='icon'/>
                                <div className='title'>{title}</div>
                                <div className='descr'>{descr}</div>
                            </li>
                        })}

                    </ul>

                </div>
            </div>

            <div className='page-block promote'>
                <div className='inner'>
                    <div className='f-title'>同一水平起点下Java人才的晋升路线</div>
                    <div className='img'/>
                </div>

            </div>

            <div className='page-block feature'>
                <div className='inner'>
                    <div className='f-title'>选择迈道教育的五大理由</div>
                    <div className='s-title'>
                        “迈道教育”秉承“全心全意服务学员，认认真真践行教育”的企业文化，坚守“产·研”一体化教育策和“高·精·实”三维型教学目标，立志打造一个教学专业，技术新颖的I教育机构。采用国内前沿开发技术，坚持100%纯面授，只为高品质的教学，高成本培养模式，教学大纲紧跟企业需求，拥有全国一体化就业服务，立志打造一个教学专业并紧跟当下流行前沿技术的教机构。迈道教育靠着优秀的课程体系，严肃的学习氛围，细致的教学服务，周到的就业指导，持续不断的课程更新，让来自不同背景、不同起点的同学达到了他们的学习目标。我们未来必将用更加严谨的态度，服务好每一个学生，全心全意只为您能高薪就业。
                    </div>

                    <ul>
                        {feature.map((item, index) => {
                            let {title, descr} = item;
                            return <li key={index}>
                                <div className='icon'/>
                                <div className='title'>{title}</div>
                                <div className='descr'>{descr}</div>
                            </li>
                        })}
                    </ul>

                </div>
            </div>

            <div className='page-block trainers'>
                <div className='inner'>

                    <div className='f-title'>靠谱的师资团队</div>
                    <div className='s-title'>
                        资深一线讲师阵容，倾囊相授实战项目经验。我们的讲师均是来自国内前沿互联网公司的全栈工程师，具备十年以上的软件开发经验，百例以上的自主研发案例，授课风趣幽默，深入浅出，引人入胜
                    </div>

                    <Carousel centerMode={true} infinite={true} centerPadding="0" autoplay={true}
                              dots={false} arrows={true} slidesToShow={4} speed={1000}>
                        {trainers.map((trainer, index) => {
                            let {id, img, name, job, intro} = trainer;
                            return <div className='item-wrap' key={index}>
                                <div className='item'>
                                    <img src={img} className='img'/>
                                    <div className='cover'>
                                        <div className='name'>{name}</div>
                                        <div className='job'>{job}</div>
                                        <div className='intro'>{intro}</div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </Carousel>
                </div>
            </div>

            <TrainingProject/>

            <div className='page-block facility'>
                <div className='inner'>

                    <div className='f-title'>舒适的硬件配套</div>
                    <div className='s-title'>
                        高配置、高安全、超舒适、健康的教学环境，让你无忧学习，成就未来
                    </div>

                    <div className='blocks'>
                        <div className='item'
                             style={{float: 'left', width: '510px', height: '405px', marginRight: '5px'}}>
                            <img style={{width: '510px', height: '405px'}}
                                 src={require('../../assets/image/home/facility_1.png')}/>
                            <div className='tip'>外部教学环境</div>
                        </div>
                        <div style={{float: 'left'}}>
                            <div style={{width: '685px', height: '200px'}}>
                                <div className='item'
                                     style={{float: 'left', width: '225px', height: '200px', marginRight: '5px'}}>
                                    <img style={{width: '225px', height: '200px'}}
                                         src={require('../../assets/image/home/facility_2.png')}/>
                                    <div className='tip'>手把手教学</div>
                                </div>
                                <div className='item'
                                     style={{float: 'left', width: '225px', height: '200px', marginRight: '5px'}}>
                                    <img style={{width: '225px', height: '200px'}}
                                         src={require('../../assets/image/home/facility_3.png')}/>
                                    <div className='tip'>单人单床</div>
                                </div>
                                <div className='item'
                                     style={{float: 'left', width: '225px', height: '200px'}}>
                                    <img style={{width: '225px', height: '200px'}}
                                         src={require('../../assets/image/home/facility_4.png')}/>
                                    <div className='tip'>干净的住宿环境</div>
                                </div>
                            </div>
                            <div style={{width: '685px', height: '200px', marginTop: '5px'}}>
                                <div className='item'
                                     style={{float: 'left', width: '455px', height: '200px', marginRight: '5px'}}>
                                    <img style={{width: '455px', height: '200px'}}
                                         src={require('../../assets/image/home/facility_5.png')}/>
                                    <div className='tip'>手把手教学</div>
                                </div>
                                <div className='item'
                                     style={{float: 'left', width: '225px', height: '200px'}}>
                                    <img style={{width: '225px', height: '200px'}}
                                         src={require('../../assets/image/home/facility_6.png')}/>
                                    <div className='tip'>手把手教学</div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>


            <div className='page-block partner'>
                <div className='inner'>

                    <div className='f-title'>与数十家知名企业合作</div>
                    <div className='s-title'>
                        校企合作，知名企业合作，每年数千面试名额，学习优秀者可直接内推至公司，优先技术总监直面，给您的就业多一份保障
                    </div>
                    <div className='clearfix-h20'/>
                    <div className='clearfix-h20'/>
                    <div className='clearfix-h20'/>
                    <Row gutter={16}>
                        {partners.map((partner, index) => {
                            let {img} = partner;
                            return <Col className="gutter-row" span={4} key={index}>
                                <div className="gutter-box">
                                    <img src={img}/>
                                </div>
                            </Col>
                        })}
                    </Row>
                </div>
            </div>

            <FreeBar/>

            <div className='articles'>
            </div>

        </div>

    }
}

