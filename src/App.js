import React from "react";
import Room from "./components/Room";
import Chat from "./components/Chat/Chat";
import Todo from "./components/Todo/Todo";
import Album from "./components/Album/Album";

import UpLoad from "./components/Profile/UpLoad";
import Login from "./Entrance/Login";
import SignUp from "./Entrance/SignUp";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Route/AuthService";

import LoggedInRoute from "./Route/LoggedInRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <LoggedInRoute exact path="/" component={Room} />
          <LoggedInRoute path="/Chat" component={Chat} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/UpLoad" component={UpLoad} />
          <Route exact path="/Todo" component={Todo} />
          <Route exact path="/Album" component={Album} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
