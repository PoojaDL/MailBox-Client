import React from "react";
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

const Sidebar = () => {
  const inboxTotal = useSelector((state) => state.inbox.totalInboxMessages);
  const sentTotal = useSelector((state) => state.sent.totalSentMessages);

  const dispatch = useDispatch();
  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };
  const date = new Date().toDateString("en-US");
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Sidebar
          </a>
          <p>{date}</p>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/Home/New-mail" activeClassName="activeClicked">
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
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            <Button onClick={logoutHandler}>Logout</Button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
