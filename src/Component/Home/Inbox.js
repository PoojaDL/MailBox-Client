import { Fragment, useCallback, useEffect, useState } from "react";
import InboxMessages from "./InboxMessages";
import { Table } from "react-bootstrap";
import ReadMessage from "./ReadMessage";

const Inbox = () => {
  const [getData, setData] = useState("");
  const [readFullMessage, setRead] = useState(false);
  const [reload, setLoad] = useState(false);
  const [receivedMails, setMails] = useState([]);
  const email = JSON.parse(localStorage.getItem("token")).email;
  const receiverEmail = email.replace(/[^a-z0-9]/gi, "");

  const stateChangeHandler = () => {
    setLoad((prev) => !prev);
  };

  const reloadMails = useCallback(() => {
    console.log("reloaded");
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
        // console.log(data);
        setMails(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [receiverEmail]);

  useEffect(() => {
    reloadMails();
  }, [reload, reloadMails]);

  return (
    <Fragment>
      {readFullMessage && <ReadMessage setRead={setRead} getData={getData} />}
      {!readFullMessage && (
        <Table striped hover size="sm">
          <thead>
            <tr>
              <th className="py-3"></th>
              <th className="ps-1 p-3">Sender</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Message</th>
              <th className="p-3">Timings</th>
            </tr>
          </thead>
          <tbody>
            {receivedMails &&
              Object.keys(receivedMails).map((key, index) => {
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
          </tbody>
        </Table>
      )}
      {!receivedMails && (
        <div align="center">
          <p>Found no data</p>
        </div>
      )}
    </Fragment>
  );
};

export default Inbox;
