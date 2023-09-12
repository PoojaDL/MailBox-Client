import { Fragment, useEffect, useState } from "react";
import InboxMessages from "./InboxMessages";
import { Table } from "react-bootstrap";

const Inbox = () => {
  const [receivedMails, setMails] = useState([]);
  const email = JSON.parse(localStorage.getItem("token")).email;
  const receiverEmail = email.replace(/[^a-z0-9]/gi, "");

  useEffect(() => {
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
        console.log(error);
      });
  }, [receiverEmail]);

  return (
    <Fragment>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th className="py-3">Sender</th>
            <th className="py-3">Subject</th>
            <th className="py-3">Message</th>
            <th className="py-3">Timings</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(receivedMails).map((key, index) => {
            return (
              <InboxMessages
                sender={receivedMails[key].senderMail}
                subject={receivedMails[key].subject}
                message={receivedMails[key].message}
                timings={receivedMails[key].timings}
              />
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Inbox;
