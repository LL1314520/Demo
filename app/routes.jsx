import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'

import Login from './component/login/Login';
import ResetPwd from './component/login/ResetPwd';

import HomeWrap from './component/HomeWrap';
import Home from './component/page/Home';
import JavaPrimary from './component/page/JavaPrimary';
import ReactPrimary from './component/page/ReactPrimary';
import Lesson from './component/page/Lesson';
import Service from './component/page/Service';
import About from './component/page/About';
import AliDemo from './component/page/AliDemo';

import Articles from './component/page/Articles';
import Article from './component/page/Article';

import TraineeWrap from './component/TraineeWrap'
import Profile from './component/trainee/Profile'

const routes = (
    <HashRouter>
        <Switch>

            <Route path='/login' component={Login}/>
            <Route path='/reset-pwd' component={ResetPwd}/>
            <Route path='/ali-demo' component={AliDemo}/>
            <Route path='/trainee' children={() => (
                <TraineeWrap>
                    <Route path='/trainee/profile' component={Profile}/>
                    <Route path='/trainee/msgs' component={Profile}/>
                </TraineeWrap>)}>
            </Route>

            <Route path='/' children={() => (
                <HomeWrap>
                    <Switch>

                        <Route path='/' exact component={Home}/>

                        <Route path='/java-primary' exact component={JavaPrimary}/>
                        <Route path='/react-primary' exact component={ReactPrimary}/>
                        <Route path='/lesson/:id' exact component={Lesson}/>

                        <Route path='/service' exact component={Service}/>

                        <Route path='/about' exact component={About}/>

                        <Route path='/articles' exact component={Articles}/>
                        <Route path='/article/:id' exact component={Article}/>

                    </Switch>
                </HomeWrap>
            )}>
            </Route>

        </Switch>
    </HashRouter>
);


export default routes;
