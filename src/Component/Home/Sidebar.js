import React, { Fragment } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/auth-reducer";
import { inboxActions } from "../../Store/inbox-reducer";
import { sentActions } from "../../Store/sent-reducer";
import styles from "./Home.module.css";

const Sidebar = (props) => {
  const inboxTotal = useSelector((state) => state.inbox.totalInboxMessages);
  const sentTotal = useSelector((state) => state.sent.totalSentMessages);
  // console.log(inboxTotal, sentTotal);

  const dispatch = useDispatch();
  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
    dispatch(inboxActions.addInboxMail([]));
    dispatch(sentActions.addSentMail([]));
  };
  const date = new Date().toDateString("en-US");

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
          zIndex: "1",
          position: "absolute",
          top: "0px",
          left: "0px",
        }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              {/* Sidebar */}
            </a>
            <p>{date}</p>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                exact
                to="/Home/New-mail"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="envelope">Compose</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Home/Inbox" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="inbox">
                  {`Inbox ${inboxTotal}`}
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Home/Sent" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="comment">{`Sent ${sentTotal}`}</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div align="center">
              <Button
                onClick={props.closeNav}
                className={`btn-light ${styles.closingBtn}`}
              >
                <img
                  style={{ width: "30px", height: "30px" }}
                  src="https://cdn-icons-png.flaticon.com/128/3444/3444494.png"
                  alt="up-arrow"
                />
              </Button>
            </div>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              <Button onClick={logoutHandler} className="btn-light">
                <img
                  style={{ width: "30px", height: "30px" }}
                  src="https://cdn-icons-png.flaticon.com/128/10313/10313098.png"
                  alt="logout"
                />
              </Button>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
      )
    </Fragment>
  );
};

export default Sidebar;
