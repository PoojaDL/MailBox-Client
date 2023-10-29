import { Fragment, memo, useCallback, useEffect, useState } from "react";
import InboxMessages from "./InboxMessages";
import { Button } from "react-bootstrap";
import ReadMessage from "./ReadMessage";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../../Store/inbox-reducer";

const Inbox = () => {
  const dispatch = useDispatch();
  const inboxState = useSelector((state) => state.inbox);
  const receivedMails = useSelector((state) => state.inbox.inboxMessage);
  const [getData, setData] = useState("");
  const [readFullMessage, setRead] = useState(false);
  const [reload, setLoad] = useState(false);
  const email = JSON.parse(localStorage.getItem("token")).email;
  const receiverEmail = email.replace(/[^a-z0-9]/gi, "");

  const stateChangeHandler = () => {
    setLoad((prev) => !prev);
  };

  const fetchInboxMails = useCallback(() => {
    fetch(
      `https://emails-3d016-default-rtdb.firebaseio.com/receiver${receiverEmail}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        if (data !== null) {
          dispatch(inboxActions.addInboxMail(data));
        } else {
          dispatch(inboxActions.addInboxMail([]));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [receiverEmail, dispatch]);

  useEffect(() => {
    fetchInboxMails();
  }, [fetchInboxMails, reload]);

  return (
    <Fragment>
      {/* {console.log("Inbox is called")} */}
      {readFullMessage && <ReadMessage setRead={setRead} getData={getData} />}
      {!readFullMessage && (
        <div className="mt-3">
          <div>
            <p>
              <b>
                Messages:
                <Button
                  className="btn-secondary btn-sm btn-outline-light"
                  style={{ borderRadius: "50%" }}
                >
                  {inboxState.totalInboxMessages}
                </Button>{" "}
              </b>
              <b>
                Unread:
                <Button
                  className="btn-secondary btn-sm btn-outline-light"
                  style={{ borderRadius: "50%" }}
                >
                  {inboxState.unreadMails}
                </Button>
              </b>
            </p>
          </div>

          <hr />
          {receivedMails &&
            Object.keys(receivedMails)
              .reverse()
              .map((key) => {
                const data = {
                  id: key,
                  read: receivedMails[key].read,
                  receiverMail: receivedMails[key].receiverMail,
                  senderMail: receivedMails[key].senderMail,
                  subject: receivedMails[key].subject,
                  message: receivedMails[key].message,
                  timings: receivedMails[key].timings,
                };
                return (
                  <InboxMessages
                    render={stateChangeHandler}
                    key={key}
                    data={data}
                    setRead={setRead}
                    setData={setData}
                  />
                );
              })}
        </div>
      )}
      {receivedMails.length === 0 && (
        <div align="center">
          <p>Found no data</p>
        </div>
      )}
    </Fragment>
  );
};

export default memo(Inbox);
