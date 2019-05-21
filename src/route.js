import React from 'react';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import Login from './login';
import Detail from './detail';
import Home from './home';
import Playlist from './playlist.jsx';


const BasicRoute = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/detail" component={Detail} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/playlist/:id" component={Playlist} />
        </Switch>
    </BrowserRouter >
);


export default BasicRoute;