import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from "./pages/login.jsx"
import Upload from "./pages/upload.jsx"
import Detail from "./pages/upload.jsx"
import Home from "./pages/home.jsx"
import Playlist from "./pages/playlist.jsx"
import Play from "./pages/play.jsx"
const BasicRoute = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/upload" component={Upload} />
      <Route exact path="/detail" component={Detail} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/playlist/:id" component={Playlist} />
      <Route exact path="/play/:id" component={Play} />
    </Switch>
  </BrowserRouter>
)

export default BasicRoute
