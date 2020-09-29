import React from 'react';
import '../../assets/css/page/practices.scss';
import {App, U} from '../../common';
import {Button, Checkbox, Radio} from 'antd';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

export default class Practices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(this.props.id),

            practices: []
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let {id} = this.state;
        App.api('ws/home/practices_by_lessonId', {id}).then((ret) => {
            let {lesson = {}, practices = []} = ret;
            this.setState({lesson, practices});
            U.setWXTitle(lesson.name);
        });
    };

    valueChanged = (v, index) => {
        let {practices = []} = this.state;
        practices[index].value = v;
        this.setState({practices});
    };

    checkData = () => {
        let {id, practices = []} = this.state;
        App.api('ws/home/practices_answer_by_lessonId', {}).then((ps) => {
            practices.map((practice, index) => {
                let {id, type} = practice;
                let p = ps.find(item => item.id === id);
                if (p) {
                    if (type === 'select' || type === 'mselect') {
                        let keys = [];
                        p.options.map((op) => {
                            if (op.isKey === 1) {
                                keys.push(op.label);
                            }
                        });
                        practice.options = p.options;
                        practice.keys = keys;
                    } else {
                        practice.answer = p.answer || `<span class="error">没有参考答案</span>`;
                    }
                }
            });

            this.setState({practices});
        });
    };

    render() {

        let {practices = []} = this.state;

        return <div className="practices-page">

            <div className="page-form">

                <ul>
                    {practices.map((item, i) => {

                        let {type, question, options = [], value, answer, keys = []} = item;
                        question = U.date.pad(i + 1) + '. ' + question;

                        switch (type) {

                            case 'textarea':
                                return <div key={i}>
                                    <li>
                                        <div className='label'>{question}</div>
                                    </li>
                                    {answer && <li>
                                        <div className='answer' dangerouslySetInnerHTML={{__html: answer}}/>
                                    </li>}
                                    <div className='split'/>
                                </div>;
                            case 'select': {
                                value = value || '';
                                let _options = [];
                                options.map((v) => {
                                    _options.push({
                                        label: ((v.isKey && v.isKey === 1 ? '[参考答案] ' : '') + v.label),
                                        value: v.label,
                                    });
                                });

                                let error = keys.length > 0 && keys[0] !== value;

                                return <div key={i}>
                                    <li>
                                        <div className={`label ${error && 'error'}`}>{question}</div>

                                        <RadioGroup onChange={(e) => {
                                            this.valueChanged(e.target.value, i);
                                        }} value={value}>
                                            {_options.map((op, ii) => {
                                                return <Radio key={ii} value={op.value}>{op.label}</Radio>
                                            })}
                                        </RadioGroup>
                                    </li>
                                    <div className='split'/>
                                </div>;
                            }

                            case 'mselect':
                                value = value || [];

                                let _options = [];
                                options.map((v) => {
                                    _options.push({
                                        label: ((v.isKey && v.isKey === 1 ? '[参考答案] ' : '') + v.label),
                                        value: v.label,
                                    });
                                });

                                let error = false;
                                if (keys.length > 0) {
                                    error = keys.toString() !== value.toString();
                                }
                                console.log(value);
                                return <div key={i}>
                                    <li key={i + '-1'}>
                                        <div className={`label ${error && 'error'}`}>{question}</div>
                                    </li>
                                    <li>
                                        <CheckboxGroup options={_options} value={value} onChange={(value) => {
                                            this.valueChanged(value, i);
                                        }}/>
                                    </li>
                                    <div className='split'/>
                                </div>;

                            default:
                                return <div key={i}>
                                    <li>
                                        <div className='label'>{question}</div>
                                    </li>
                                    {answer && <li>
                                        <div className='answer' dangerouslySetInnerHTML={{__html: answer}}/>
                                    </li>}
                                    <div className='split'/>
                                </div>;
                        }
                    })}
                </ul>

            </div>
            <div className='btm-btn'>
                <Button type='primary' onClick={() => this.checkData()}>查看答案</Button>
            </div>
        </div>
    }
}