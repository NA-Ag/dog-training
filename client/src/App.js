import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from 'semantic-ui-react';

import "semantic-ui-css/semantic.min.css";
import './App.css';

import MenuBar from "./Components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Container>
        <MenuBar/>
        {/* <div><h1>Hi world</h1></div> */}
          
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
      
      </Container>
    </Router>
  );
}

export default App;
