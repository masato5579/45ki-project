import React from "react";
import Room from "./components/Room";
import Chat from "./components/Chat/Chat";

import UpLoad from "./components/Profile/UpLoad";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Room} />
        <Route exact path="/Chat" component={Chat} />
        <Route exact path="/UpLoad" component={UpLoad} />
      </Switch>
    </Router>
  );
};

export default App;
