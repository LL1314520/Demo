import React from 'react'
import '../../assets/css/page/service.scss'
import U from "../../common/U";
import {Banners, TrainingProject} from "../Comps";
import {App, CTYPE} from "../../common";


const teachModels = [{head: '产', title: '合作企业', descr: '拥有自己的科技公司，项目均为真实有效项目，为学员提供真实的项目经验，毕业后相当于拥有1-3年工作经验。'}, {
    head: '学', title: '教学团队',
    descr: '我们的老师全部来自上海，且具有10年+互联网经验的精英团队，拥有大量的实战经验和管理经验。'
}, {head: '研', title: '技术研讨会', descr: '定期技术交流会，研究一下当下流行的技术，比如大数据、分布式、AI、人工智能等，紧跟时代与科技发展的潮流。'}];

const teachFeatures = [{title: '3大课程体系', descr: '根据每个学生的真实情况，分阶段教学。合理的课程体系，让学员由浅及深的了解并学会编程。做到零基础学习无压力。'}, {
    title: '500+就业合作单位',
    descr: '我们跟多家知名人力资源以及上百家大中型企业合作，100%保证就业，丰富的知识储备，让学员早企业的工作中如鱼得水，独当一面。'
}, {title: '技术支持服务', descr: '提供技术支持，依旧为毕业后的学员提供技术难点解惑'}];

const employmentSecuritys = [{
    title: '一对一就业指导',
    descr: '专业团队以结果为导向，从简历、求职心态等全方面辅导，带你变身当前互联网技术人才市场，值钱的IT人才。'
}, {title: '岗位内推机制', descr: '跟知名人力资源企业合作，建立专属人才库，人才就业通道。优秀学员享受专属应聘通道及优先推荐待遇。'}, {
    title: '无限期免费推荐就业',
    descr: '定期举办IT人才招聘会，百家名企定向直招。更有企业上门招聘，为学员开设绿色就业通道，无限期免费推荐就业。'
}, {
    title: '职业素养课',
    descr: '由专业的就业导师为学员带来职业素养课程；定期企业面试官现场模拟面试。'
}];

const bannerType = CTYPE.bannerTypes.SERVICE;

export default class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: []
        }
    }

    componentDidMount() {
        U.setWXTitle('教学服务');
        this.loadData();
    }

    loadData = () => {

        App.api('/ws/home/banners', {bannerQo: JSON.stringify({type: bannerType})}).then((banners) => {
            this.setState({banners});
        });
    };

    render() {

        let {banners = []} = this.state;

        return <div className='service-page'>

            {banners.length > 0 && <Banners banners={banners} bannerType={bannerType}/>}


            <div className='page-block teach-model'>
                <div className='inner'>
                    <div className='f-title'>教学模式：产、学、研相结合</div>
                    <div className='s-title'>我们要做贴合市场需求的课程</div>

                    <ul>
                        {teachModels.map((m, index) => {
                            let {head, title, descr} = m;
                            return <li key={index}>
                                <div className='icon'>{head}</div>
                                <div className='box'>
                                    <div className='title'>{title}</div>
                                    <div className='descr'>{descr}</div>
                                </div>
                            </li>

                        })}
                    </ul>

                </div>
            </div>

            <div className='page-block teach-feature'>
                <div className='inner'>
                    <div className='f-title'>良心教育、专业教育、工匠精神</div>
                    <div className='s-title'>我们确保每个学生都能学会听懂，并且我们承诺全部学员100%就业</div>

                    <ul>
                        {teachFeatures.map((f, index) => {
                            let {title, descr} = f;
                            return <li key={index}>
                                <div className='icon'/>
                                <div className='title'>{title}</div>
                                <div className='descr'>{descr}</div>
                            </li>
                        })}
                    </ul>

                </div>
            </div>

            <TrainingProject/>

            <div className='page-block employment-security'>
                <div className='inner'>
                    <div className='f-title'>我们的就业保障</div>
                    <div className='s-title'>我们提供全面的就业保障服务，我们更需要认真学习的你</div>
                    <ul>
                        {employmentSecuritys.map((e, index) => {
                            let {title, descr} = e;
                            return <li key={index}>
                                <div className='icon'/>
                                <div className='title'>{title}</div>
                                <div className='descr'>{descr}</div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>

        </div>
    }
}