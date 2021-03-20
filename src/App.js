import React, { createContext, useState } from "react";
import './App.css';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Login from './component/login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NoMatch from "./component/nomatch/NoMatch";
import PrivetRoute from "./component/privetroute/PrivetRoute";
import Destination from "./component/destination/Destination";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <p className="App">Login: {loggedInUser.name}</p>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <PrivetRoute path="/destination/:riderId">
              <Destination></Destination>
            </PrivetRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>

  );
}

export default App;
