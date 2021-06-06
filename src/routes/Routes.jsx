import { Route, Switch, useLocation } from "react-router-dom";

import { BlogPage } from "./BlogPage";

function Routes(props) {
  return (
    <main className="main-content">
      <Switch>
        <Route component={BlogPage} path="/" name exact />
      </Switch>
    </main>
  );
}

export default Routes;
