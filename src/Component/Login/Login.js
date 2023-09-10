import { Fragment, useRef, useState } from "react";
import classes from "./Login.module.css";
import { Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-reducer";

const Login = () => {
  let MyAPI = process.env.REACT_APP_SECRET.replace(/[^a-z0-9]/gi, "");
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [load, setLoad] = useState(false);
  const emailInput = useRef();
  const passInput = useRef();
  const confPassInput = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const email = emailInput.current.value;
    const password = passInput.current.value;
    let confPassword = "";
    if (!isLogin) {
      confPassword = confPassInput.current.value;
    }

    if (email && password) {
      setLoad(true);
      let url;
      if (isLogin) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${MyAPI}`;
      } else if (!isLogin && password !== confPassword) {
        alert("Enter the same password");
      } else {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${MyAPI}`;
      }
      console.log(url);

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setLoad(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = data.error.message;
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          dispatch(authActions.login(data));
          console.log(data);
          if (isLogin) {
            history.replace("./");
          } else {
            alert("Account created successfully..!");
            emailInput.current.value = "";
            passInput.current.value = "";
            setIsLogin((prevState) => !prevState);
            history.replace("./");
          }
        })
        .catch((error) => alert(error));
    } else {
      alert("Enter the inputs before submitting");
    }
  };

  return (
    <Fragment>
      <div className={classes.auth}>
        <Form onSubmit={formSubmitHandler}>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            aria-required
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={emailInput}
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput3"
            required
          >
            <Form.Label>Password</Form.Label>
            <Form.Control ref={passInput} type="password" />
          </Form.Group>
          {!isLogin && (
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2"
              required
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control ref={confPassInput} type="password" />
            </Form.Group>
          )}
          <Link to="/forgotpassword" style={{ color: "red" }}>
            forgot password?
          </Link>
          <div className={classes.actions}>
            {load ? (
              <p style={{ color: "black" }}>Sending request...</p>
            ) : (
              <button>{isLogin ? "Login" : "Create account"}</button>
            )}

            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              <p style={{ color: "white" }}>
                {isLogin ? "Create new account" : "Login with existing account"}
              </p>
            </button>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default Login;
