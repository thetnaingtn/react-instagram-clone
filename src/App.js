import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as Routes from "./constants/routes";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Router>
        <Switch>
          <Route path={Routes.LOGIN} component={Login} />
          <Route path={Routes.SIGN_UP} component={SignUp} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
