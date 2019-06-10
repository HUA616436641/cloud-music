import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import "amfe-flexible"
// import from 'vconsole'
import * as serviceWorker from "./serviceWorker"
import "./styles/common.scss"
import App from "./App"
import rootReducer from "./reducers"
// import './assets/font/iconfont.css'
import Player from "@/containers/Player"

// let VConsole = require("vconsole")
// new VConsole()
const { composeWithDevTools } = require("redux-devtools-extension")
const middleware = [thunk]
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

ReactDOM.render(
  <Provider store={store}>
    <Player />
    <App />
  </Provider>,
  document.getElementById("root")
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
