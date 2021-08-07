import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Login = lazy(() => import("./pages/login"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
