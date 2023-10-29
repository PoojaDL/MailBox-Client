import htmlToFormattedText from "html-to-formatted-text";
import { Fragment, memo } from "react";
import { Button } from "react-bootstrap";
import styles from "./Home.module.css";

const InboxMessages = (props) => {
  const email = JSON.parse(localStorage.getItem("token")).email;
  const receiverEmail = email.replace(/[^a-z0-9]/gi, "");

  const readMessageHandler = (event) => {
    event.preventDefault();

    fetch(
      `https://emails-3d016-default-rtdb.firebaseio.com/receiver${receiverEmail}/${props.data.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ ...props.data, read: true }),
      }
    ).then((res) => {
      if (res.ok) {
        props.setRead(true);
        props.setData(props.data);
        props.render();
      }
    });
  };

  const deleteMail = (event) => {
    event.preventDefault();
    fetch(
      `https://emails-3d016-default-rtdb.firebaseio.com/receiver${receiverEmail}/${props.data.id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        props.render();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Fragment>
      <div
        className={`px-2 py-1 py-md-2 pb-0 my-3 ${styles.listDiv}`}
        style={{ background: `${props.data.read && "#f2f2f2"}` }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "left",
          }}
        >
          <div
            onClick={readMessageHandler}
            style={{
              display: "flex",
              flexWrap: "wrap",
              rowGap: "0rem",
              columnGap: "0.5rem",
              flexDirection: "row",
              width: "100%",
              justifyContent: "left",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
              alt="profile-pic"
              width="25px"
              height="25px"
            />
            <p
              className="me-5 m-0 ms-1"
              style={{ fontWeight: `${!props.data.read && "bolder"}` }}
            >
              {props.data.senderMail}
            </p>
            <p
              className="me-5 m-0"
              style={{ fontWeight: `${!props.data.read && "bolder"}` }}
            >
              {props.data.subject}
            </p>
            <div
              style={{
                maxWidth: "180px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "clipped",
              }}
            >
              <p className="me-5 m-0">
                {htmlToFormattedText(props.data.message)}
              </p>
            </div>
            <p className={`m-0 ms-3 ${styles.timings}`}>{props.data.timings}</p>
          </div>
          <span className="my-auto">
            <Button className="p-0 btn-light">
              <img
                onClick={deleteMail}
                style={{ width: "25px", height: "25px" }}
                src="https://cdn-icons-png.flaticon.com/512/3221/3221845.png"
                alt="delete"
              />
            </Button>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(InboxMessages);
