import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import images from "./images/b_kung_head.png"
import "./App.css"
import Register from "./pages/register"
let Home = props => (
  <div className="App">
    <header className="App-header">
      <img src={images} className="App-logo" alt="b-kung head" />
      <h1>{props.notFound ? "not Found" : "Home Pages"}</h1>
    </header>
  </div>
)

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route exact component={() => <Home notFound></Home>}></Route>
      </Switch>
    </Router>
  )
}

export default App
