import htmlToFormattedText from "html-to-formatted-text";
import { Fragment } from "react";
import { Button } from "react-bootstrap";

const SentMessages = (props) => {
  const email = JSON.parse(localStorage.getItem("token")).email;
  const receiverEmail = email.replace(/[^a-z0-9]/gi, "");

  const readMessageHandler = (event) => {
    event.preventDefault();

    fetch(
      `https://emails-3d016-default-rtdb.firebaseio.com/sender${receiverEmail}/${props.data.id}.json`,
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
      `https://emails-3d016-default-rtdb.firebaseio.com/sender${receiverEmail}/${props.data.id}.json`,
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
      <tr>
        <td className="py-0">
          {!props.data.read ? (
            <div
              style={{
                margin: "auto",
                marginTop: "1.5rem",
                width: "10px",
                height: "10px",
                background: "blue",
                borderRadius: "50%",
              }}
            ></div>
          ) : (
            ""
          )}
        </td>
        <td className=" ps-1 p-3" onClick={readMessageHandler}>
          {props.data.receiverMail}
        </td>
        <td className="p-3" onClick={readMessageHandler}>
          {props.data.subject}
        </td>
        <td
          className="p-3"
          style={{
            maxWidth: "180px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "clipped",
          }}
          onClick={readMessageHandler}
        >
          {htmlToFormattedText(props.data.message)}
        </td>

        <td className="p-3">{props.data.timings}</td>
        <td className="p-3">
          <Button onClick={deleteMail}>Delete</Button>
        </td>
      </tr>
    </Fragment>
  );
};

export default SentMessages;
