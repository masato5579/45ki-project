import React from "react";
import Room from "./components/Room";
import Chat from "./components/Chat/Chat";

<<<<<<< HEAD
import UpLoad from "./components/Profile/UpLoad";
=======
import Login from "./Entrance/Login";
import SignUp from "./Entrance/SignUp";
>>>>>>> 6b45c17709cd2f79f89689540a738482f12e5143

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Route/AuthService";

import LoggedInRoute from "./Route/LoggedInRoute";

const App = () => {
  return (
<<<<<<< HEAD
    <Router>
      <Switch>
        <Route exact path="/" component={Room} />
        <Route exact path="/Chat" component={Chat} />
        <Route exact path="/UpLoad" component={UpLoad} />
      </Switch>
    </Router>
=======
    <AuthProvider>
      <Router>
        <Switch>
          <LoggedInRoute exact path="/" component={Room} />
          <LoggedInRoute path="/Chat" component={Chat} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </AuthProvider>
>>>>>>> 6b45c17709cd2f79f89689540a738482f12e5143
  );
};

export default App;
