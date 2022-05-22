import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import './App.css';

import MenuBar from "./Components/navMenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
    <MenuBar />
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/signup" component={SignUp}/>
    </Router>
  );
}

export default App;
