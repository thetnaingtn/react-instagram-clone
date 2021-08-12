import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/user-auth-listener";
import UserContext from "./context/user";
import ProtectedRoute from "./helpers/protected-route";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Suspense fallback={<p>Loading...</p>}>
        <Router>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD}>
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
