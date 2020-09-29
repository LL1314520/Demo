import React from 'react';
import TraineeProfile from "./TraineeProfile";
import {U} from "../../common";
import '../../assets/css/trainee/profile.scss'

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        };
    }

    componentDidMount() {

        U.setWXTitle('个人中心');

        TraineeProfile.get().then((profile) => {
            this.setState({profile});
        })
    };

    render() {

        let {profile = {}} = this.state;
        let {trainee = {}} = profile;

        let {img, name, studentNum, mobile, email, admissionAt,} = trainee;

        return <div className="profile-page">

            <div className='block-title'>个人信息</div>

            <div className='profile'>
                <img className='avatar' src={img}/>

                <ul className='info'>
                    <li>
                        学号：{studentNum}
                    </li>
                    <li>
                        姓名：{name}
                    </li>
                    <li>
                        手机号：{mobile}
                    </li>
                    <li>
                        邮箱：{email}
                    </li>
                    <li>
                        入学时间：{U.date.format(new Date(admissionAt), 'yyyy-MM-dd')}
                    </li>
                </ul>

            </div>

        </div>
    }
}