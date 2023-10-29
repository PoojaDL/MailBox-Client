import "./App.css";
import { Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import ForgotPassword from "./Component/Login/ForgotPassword";
import { useCallback, useEffect } from "react";
import { inboxActions } from "./Store/inbox-reducer";
import { sentActions } from "./Store/sent-reducer";

function App() {
  let email = "";
  const isAuthLogin = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  if (localStorage.getItem("token")) {
    email = JSON.parse(localStorage.getItem("token")).email;
  }

  console.log(email);

  const receiverEmail = email.replace(/[^a-z0-9]/gi, "");

  const fetchMails = useCallback(
    (type) => {
      fetch(
        `https://emails-3d016-default-rtdb.firebaseio.com/${type}${receiverEmail}.json`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log(res.statusText);
            throw new Error(res.statusText);
          }
        })
        .then((data) => {
          if (data !== null) {
            // console.log(data);
            if (type === "receiver") {
              dispatch(inboxActions.addInboxMail(data));
            } else {
              dispatch(sentActions.addSentMail(data));
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [receiverEmail, dispatch]
  );

  useEffect(() => {
    if (email !== "") {
      fetchMails("receiver");
      fetchMails("sender");
    }
  }, [fetchMails, email]);

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
