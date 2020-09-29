import React from 'react'
import '../../assets/css/page/alidemo.scss'
import U from "../../common/U";
import {App, CTYPE} from "../../common";
import {Banners} from "../Comps";
import AutoResponsive from 'autoresponsive-react';
import HomeNav from './HomeNav';

const bannerType = CTYPE.bannerTypes.ABOUT_PC;

export default class AliDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            jobs: [],
            heights: []
        }
    }

    componentDidMount() {
        U.setWXTitle('首页');
    }





    render() {

        return <div className="ali-page">
            <HomeNav/>
        </div>


    }
}
