import React from 'react'
import U from "../../common/U";
import {App, CTYPE, Utils} from "../../common";
import {Pagination} from 'antd';
import '../../assets/css/page/articles.scss'

export default class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],

            pagination: {
                pageSize: 12,
                current: 0,
                total: 0
            }
        }
    }

    componentDidMount() {
        U.setWXTitle('动态');
        this.loadData();
    }

    loadData = () => {

        let {pagination = {}} = this.state;

        App.api('/usr/home/articles', {
            articleQo: JSON.stringify({
                pageNumber: pagination.current,
                pageSize: pagination.pageSize
            })
        }).then((result) => {
            let {content = []} = result;
            let pagination = Utils.pager.convert2Pagination(result);
            this.setState({
                list: content,
                pagination
            });
        });
    };

    onPageChange = (current, pageSize) => {
        let pagination = this.state.pagination;
        this.setState({
            pagination: {
                ...pagination,
                current, pageSize
            }
        }, () => this.loadData());
    };

    render() {

        let {list = [], pagination = {}} = this.state;

        return <div className='articles-page'>

            <div className='banner'/>

            <ArticleList list={list}/>

            <Pagination {...CTYPE.commonPagination}
                        onChange={(current, pageSize) => this.onPageChange(current, pageSize)}
                        onShowSizeChange={(current, pageSize) => {
                            this.onPageChange(current, pageSize)
                        }}
                        current={pagination.current} pageSize={pagination.pageSize} total={pagination.total}/>

            <div className='clearfix-h20'/>

        </div>

    }
}

export class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,

        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({list: nextProps.list})
    }

    go = (id) => {
        let url = window.location.href;
        if (url.indexOf('106.14.81.141:9011') > -1) {
            window.open(`http://106.14.81.141:9011/tsw-pc/#/article/${id}`);
        } else {
            window.open(window.location.protocol + '//' + window.location.host + `#/article/${id}`);
        }
    };

    render() {
        let {list = [], pagination = {}} = this.state;

        return <div>

            <ul className='ul-articles'>
                {list.map((article, index) => {
                    let {id, img, title, intro, createdAt} = article;
                    return <li key={index} onClick={() => this.go(id)}>
                        <img src={img} className='img'/>
                        <div className='title'>{title}</div>
                        <div className='date'>{U.date.format(new Date(createdAt), 'yyyy-MM-dd')}</div>
                        <div className='intro'>{intro}</div>
                    </li>
                })}
            </ul>
            <div className='clearfix-h20'/>
        </div>
    }

}