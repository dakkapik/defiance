import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './style/App.css'

import MissionControl from './pages/MissionControl'
import Home from './pages/Home'


export default class NavBar extends React.Component{


    render() {
        return (
            <Router>
                <div className="body"> 
                    <nav className="nav">
                        <ul className='nav-body'>
                            <li className='nav-item' key={'mission-control'}>
                                <Link className='link' to="/missionControl">DEFIANCE</Link>
                            </li>
                            <li className='nav-item' key={'home'}>
                                <Link className="link" to="/">HOME</Link>
                            </li>
                        </ul>
                    </nav> 

                    <Switch>
                        <Route path="/MissionControl">
                            <MissionControl  />
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>

                    </Switch>  

                </div>
            </Router>
        )
    }
}
