import React from 'react';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import Home from './home';
import Detail from './detail';


const BasicRoute = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/detail" component={Detail} />
        </Switch>
    </BrowserRouter >
);


export default BasicRoute;