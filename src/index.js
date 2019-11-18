import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css' // yarn add bootstrap
import "@fortawesome/fontawesome-free/css/all.min.css" //yarn add @fortawesome/fontawesome-free
import "./static/css/clean-blog.min.css"

ReactDOM.render(<App />, document.querySelector("#root"));