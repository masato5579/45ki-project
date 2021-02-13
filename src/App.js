import React from "react";
import Room from "./components/Room";
import Chat from "./components/Chat/Chat";

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
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/Chat" component={Chat} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
