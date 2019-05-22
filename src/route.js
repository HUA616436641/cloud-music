import React from 'react';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Detail from './pages/detail';
import Home from './pages/home';
import Playlist from './pages/playlist.jsx';
import Play from './pages/play.jsx';

const BasicRoute = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/detail" component={Detail} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/playlist/:id" component={Playlist} />
            <Route exact path="/play/:id" component={Play} />
        </Switch>
    </BrowserRouter >
);


export default BasicRoute;