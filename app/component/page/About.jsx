import React from 'react'
import '../../assets/css/page/about.scss'
import U from "../../common/U";
import {App, CTYPE} from "../../common";
import {Banners} from "../Comps";
import AutoResponsive from 'autoresponsive-react';

const bannerType = CTYPE.bannerTypes.ABOUT_PC;

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            jobs: [],
            heights: []
        }
    }

    componentDidMount() {
        U.setWXTitle('关于');
        this.loadData();
    }

    loadData = () => {
        App.api('/ws/home/banners', {bannerQo: JSON.stringify({type: bannerType})}).then((banners) => {
            this.setState({banners});
        });
        App.api('/ws/home/jobs', {jobQo: JSON.stringify({})}).then((jobs) => {
            this.setState({jobs}, () => {
                setTimeout(() => {
                    let heights = [];
                    jobs.map((job, i) => {
                        let box = this.refs[`job_item_${i}`];
                        if (box) {
                            heights[i] = box.clientHeight;
                        }
                    });
                    this.setState({heights});
                }, 500);
            });
        })
    };

    getAutoResponsiveProps = () => {
        return {
            itemMargin: 10,
            containerWidth: 1200,
            itemClassName: 'item',
            gridWidth: 100,
            transitionDuration: '.5'
        };
    };

    render() {

        let {banners = [], jobs = [], heights = []} = this.state;

        return <div className='about-page'>

            {banners.length > 0 && <Banners banners={banners} bannerType={bannerType}/>}

            <div className='page-block about-block'>
                <div className='inner'>
                    <div className='f-title'>关于迈道教育</div>
                    <div className='s-title'>
                        “迈道教育”是河南迈道信息技术有限公司旗下的一家教育培训机构。
                        <br/>
                        迈道教育致力于打造中国互联网全产业链人才服务平台，采用国内前沿开发技术，坚持100%纯面授，只为高品质的教学，高成本培养模式，教学大纲紧跟企业需求，拥有全国一体化就业服务，立志打造一个教学专业并紧跟当下流行前沿技术的教育机构。
                        <br/>
                        作为互联网产业联盟指定人才培养基地，平台组建以来吸纳了各界产业精英加盟，专家教师及顾问团队阵容强大公司采用真实企业项目教学，让学员真正在实战中锻炼自己，且拥有高质量的项目作品，做到毕业即可就业。
                        <br/>
                        迈道教育靠着优秀的课程体系，严肃的学习氛围，细致的教学服务，周到的就业指导，持续不断的课程更新来自不同背景、不同起点的同学达到了他们的学习目标。我们未来必将用更加严谨的态度，服务好每一个学生，全心全意只为您能高薪就业。
                    </div>
                </div>
            </div>

            <div className='page-block about-banner'>
                <div className='inner'/>
            </div>

            <div className='page-block join-us'>
                <div className='inner'>
                    <div className='f-title'>期待您的加入</div>
                    <div className='s-title'>
                        我们高度崇尚创新和团队合作精神，<br/>
                        我们热衷思想的碰撞但更提倡对彼此的尊重<br/>
                        我们期待大牛的加入<br/>
                        只要你够自信<br/>
                        我们欢迎您的加入<br/>
                    </div>
                </div>
            </div>

            <div className='bar-join'/>

            <div className='page-block join-us'>
                <div className='inner'>
                    <div className='jobs'>
                        <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
                            {jobs.map((job, i) => {
                                let {title, pay, location, responsibility = [], skill = []} = job;
                                return <div className="item" key={i} ref={`job_item_${i}`}
                                            style={{width: 500, height: heights.length > i ? heights[i] : 'auto'}}>
                                    <div className='title'>{title}</div>
                                    <div className='sub-title'>工作职责：</div>
                                    <ul>
                                        {responsibility.map((txt, index) => {
                                            return <li key={index}>{U.date.pad(index + 1)} . {txt}</li>
                                        })}
                                    </ul>
                                    <div className='sub-title'>岗位要求：</div>
                                    <ul>
                                        {skill.map((txt, index) => {
                                            return <li key={index}>{U.date.pad(index + 1)} . {txt}</li>
                                        })}
                                    </ul>
                                    <div className='clearfix'/>
                                </div>;
                            })}
                            <div className='clearfix'/>
                        </AutoResponsive>
                    </div>
                </div>
            </div>

        </div>

    }
}