import { Fragment, memo, useState } from "react";
import NewMail from "./NewMail";
import { Button } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";

import styles from "./Home.module.css";
import Inbox from "./Inbox";
// import { useSelector } from "react-redux";
import Sent from "./Sent";
import Sidebar from "./Sidebar";

const Home = () => {
  const [activeNav, setNav] = useState(true);
  const closeNavHandler = () => {
    setNav(false);
  };

  const openNavHandler = () => {
    setNav(true);
  };

  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          height: "4.7rem",
          background: "#333333",
          zIndex: "0",
        }}
      >
        <div align="center" width="10%">
          <h1 className={styles.heading}>MailBox</h1>
        </div>
        <Button onClick={openNavHandler} className="btn-light m-3 ">
          <img
            style={{ width: "30px", height: "30px" }}
            src="https://cdn-icons-png.flaticon.com/128/9304/9304700.png"
            alt="up-arrow"
          />
        </Button>
      </div>
      <div>
        <div className="m-0">
          {activeNav && <Sidebar closeNav={closeNavHandler} />}

          <div
            style={{
              paddingLeft: `${activeNav ? "20%" : "0%"}`,
              margin: "auto auto",
            }}
            className={styles.contents}
          >
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
        </div>
      </div>
    </Fragment>
  );
};

export default memo(Home);
