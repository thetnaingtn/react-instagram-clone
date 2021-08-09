import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as Routes from "./constants/routes";
import useAuthListener from "./hooks/user-auth-listener";
import UserContext from "./constants/user";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Suspense fallback={<p>Loading...</p>}>
        <Router>
          <Switch>
            <Route path={Routes.LOGIN} component={Login} />
            <Route path={Routes.SIGN_UP} component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
