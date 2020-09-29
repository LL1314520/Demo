import React from 'react'

import '../../assets/css/page/lesson.scss'
import {App, U} from "../../common";
import {Drawer, Icon} from 'antd';
import {HtmlContent} from "../Comps";
import Practices from "./Practices";

export default class Lesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(this.props.match.params.id),

            lesson: {},
            show_drawer: false,
        };
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {id} = this.state;
        let _id = parseInt(nextProps.match.params.id);
        if (id !== _id) {
            this.setState({id: _id}, () => {
                this.loadData();
            });
        }
    }

    loadData = () => {
        let {id} = this.state;
        App.api('ws/home/lesson', {id}).then((lesson) => {
            this.setState({lesson});
            let {name} = lesson;
            U.setWXTitle(name);
        });
    };

    go = (id) => {
        App.go(`/lesson/${id}`);
    };

    showDrawer = (val) => {
        this.setState({show_drawer: val || false});
    };

    isNotNull = (list) => {
        return !(list.length === 0 || list[0] === '');
    };

    render() {
        let {lesson = {}, show_drawer} = this.state;

        let {id, name, pv, requirement = [], keyPoint = [], content, lessons = [], prevLesson = {}, nextLesson = {}, practiceCount = 0} = lesson;

        return <div className="lesson-page">
            <div className='inner'>
                <div className="lesson-title">
                    <p>{name}</p>
                    <div className="stat">
                        <div className='pv'>
                            <Icon type='eye'/>
                            {U.str.num2str(pv)}
                        </div>
                    </div>
                </div>

                <div className='lesson-content'>

                    <div className="left-bar">

                        <div className='guide'>课程导视</div>
                        <ul className='lessons'>
                            {lessons.map((item, index) => {
                                let {name} = item;
                                return <li key={index} className={id === item.id ? 'curr' : ''} onClick={() => {
                                    this.go(item.id);
                                }}>{U.date.pad(index + 1)}&nbsp;.&nbsp;{name}</li>
                            })}
                        </ul>

                        <div className='btm-bar'>
                            <ul className='btns'>
                                {prevLesson.id && <li onClick={() => this.go(prevLesson.id)}>上一节</li>}
                                {!prevLesson.id && <li className='disabled'>上一节</li>}
                                {nextLesson.id && <li onClick={() => this.go(nextLesson.id)}>下一节</li>}
                                {!nextLesson.id && <li className='disabled'>下一节</li>}
                            </ul>

                            {practiceCount > 0 && <div className='btn' onClick={() => this.showDrawer(true)}>开始练习</div>}
                        </div>
                    </div>

                    <div className='right-content'>


                        {this.isNotNull(requirement) && <div className='lesson-descr'>
                            <div className='label'>课程目的与要求</div>
                            <ul>
                                {requirement.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>
                        </div>}

                        {this.isNotNull(keyPoint) && <div className='lesson-descr'>
                            <div className='label'>课程重点与难点</div>
                            <ul>
                                {keyPoint.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>
                        </div>}

                        <HtmlContent content={content}/>
                    </div>

                    <div className='clearfix'/>

                </div>

            </div>

            <Drawer
                title={`${name} 习题`}
                placement="right"
                width={700}
                closable={true}
                onClose={() => this.showDrawer(false)}
                visible={show_drawer}>

                {show_drawer && <Practices id={id}/>}

            </Drawer>

        </div>
    }
}



