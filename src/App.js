// import { Fragment } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
// import { useContext } from "react";
// import AuthContext from "./Store/auth-context";
import { useSelector } from "react-redux";
import ForgotPassword from "./Component/Login/ForgotPassword";
import ReadMessage from "./Component/Home/ReadMessage";

function App() {
  const isAuthLogin = useSelector((state) => state.auth.isLoggedIn);
  // const authCtx = useContext(AuthContext);
  // console.log(auth);
  return (
    <main>
      {!isAuthLogin && (
        <Route path="*">
          {!isAuthLogin ? <Redirect to="/Login" /> : <Redirect to="/Home" />}
        </Route>
      )}
      <Route path="/">
        {!isAuthLogin ? <Redirect to="/Login" /> : <Redirect to="/Home" />}
      </Route>
      <Route path="/Login" exact>
        <Login />
      </Route>
      {!isAuthLogin && (
        <Route path="/forgotpassword" exact>
          <ForgotPassword />
        </Route>
      )}
      {isAuthLogin && (
        <Route path="/Home">
          <Home />
        </Route>
      )}
    </main>
  );
}

export default App;
