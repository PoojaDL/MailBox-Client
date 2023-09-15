import { Fragment, memo } from "react";
import NewMail from "./NewMail";
import { Col, Row } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";

// import classes from "./Home.module.css";
import Inbox from "./Inbox";
// import { useSelector } from "react-redux";
import Sent from "./Sent";
import Sidebar from "./Sidebar";

const Home = () => {
  // const inbox = useSelector((state) => state.inbox);
  // const sent = useSelector((state) => state.sent);

  return (
    <Fragment>
      <div>
        <Row className="m-0">
          <Col className="col-2">
            <Sidebar />
          </Col>
          <Col className="col-10 mx-auto">
            <div style={{ width: "60%", margin: "auto auto" }}>
              <Redirect to="/Home/Inbox" />
              <Route path="/Home/New-mail">
                <NewMail />
              </Route>
              <Route path="/Home/Inbox">
                <Inbox />
              </Route>
              <Route path="/Home/Sent">
                <Sent />
              </Route>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default memo(Home);
