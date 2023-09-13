import { Fragment } from "react";
import NewMail from "./NewMail";
import { Button, Col, Row } from "react-bootstrap";
import { Route, NavLink } from "react-router-dom/cjs/react-router-dom.min";

import classes from "./Home.module.css";
import Inbox from "./Inbox";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-reducer";
import Sent from "./Sent";

const Home = () => {
  const dispatch = useDispatch();

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };

  return (
    <Fragment>
      <h1>
        Welcome to your <b>Mail Box</b>
      </h1>
      <Button onClick={logoutHandler}>Logout</Button>
      <div>
        <Row className="m-0">
          <Col
            className="col-md-2 col-12"
            style={{ background: "black", height: "100%" }}
          >
            <NavLink
              activeClassName={classes.active}
              className={classes.navLink}
              to="/Home/New-mail"
            >
              <p>New Mail</p>
            </NavLink>
            <NavLink
              activeClassName={classes.active}
              className={classes.navLink}
              to="/Home/Inbox"
            >
              <p>Inbox</p>
            </NavLink>
            <NavLink
              activeClassName={classes.active}
              className={classes.navLink}
              to="/Home/Sent"
            >
              <p>Sent</p>
            </NavLink>
          </Col>
          <Col className="col-md-10 col-12 mx-auto">
            <Route path="/Home/New-mail">
              <NewMail />
            </Route>
            <Route path="/Home/Inbox" exact>
              <Inbox />
            </Route>
            <Route path="/Home/Sent">
              <Sent />
            </Route>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Home;
