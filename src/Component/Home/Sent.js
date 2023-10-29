import { Fragment, useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ReadMessage from "./ReadMessage";
import SentMessages from "./SentMessages";
import { useDispatch, useSelector } from "react-redux";
import { sentActions } from "../../Store/sent-reducer";

const Sent = () => {
  const dispatch = useDispatch();
  const [getData, setData] = useState("");
  const [readFullMessage, setRead] = useState(false);
  const [reload, setLoad] = useState(false);
  const sentState = useSelector((state) => state.sent);
  const receivedMails = useSelector((state) => state.sent.sentMessage);
  const email = JSON.parse(localStorage.getItem("token")).email;
  const receiverEmail = email.replace(/[^a-z0-9]/gi, "");

  const stateChangeHandler = () => {
    setLoad((prev) => !prev);
  };

  const reloadMails = useCallback(() => {
    fetch(
      `https://emails-3d016-default-rtdb.firebaseio.com/sender${receiverEmail}.json`
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
          dispatch(sentActions.addSentMail(data));
        } else {
          dispatch(sentActions.addSentMail([]));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [receiverEmail, dispatch]);

  useEffect(() => {
    reloadMails();
  }, [reload, reloadMails]);

  return (
    <Fragment>
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
                  {sentState.totalSentMessages}
                </Button>{" "}
              </b>
              <b>
                Unread:
                <Button
                  className="btn-secondary btn-sm btn-outline-light"
                  style={{ borderRadius: "50%" }}
                >
                  {sentState.unreadMails}
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
                  <SentMessages
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

export default Sent;
