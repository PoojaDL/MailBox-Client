import { Fragment } from "react";
import NewMail from "./NewMail";
import { Col, Row } from "react-bootstrap";
import { Route, NavLink } from "react-router-dom/cjs/react-router-dom.min";

import classes from "./Home.module.css";
import Inbox from "./Inbox";

const Home = () => {
  return (
    <Fragment>
      <h1>
        Welcome to your <b>Mail Box</b>
      </h1>
      <div>
        <Row className="m-0">
          <Col
            className="col-md-2"
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
          <Col className="col-md-1">
            <div className="d-flex" style={{ height: "100%" }}>
              <div className="vr"></div>
            </div>
          </Col>
          <Col className="col-md-8">
            <h1>This is other components</h1>
            <Route path="/Home/New-mail">
              <NewMail />
            </Route>
            <Route path="/Home/Inbox">
              <Inbox />
            </Route>
            <Route path="/Home/Sent">
              <NewMail />
            </Route>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Home;
