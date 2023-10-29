import { Button, Form } from "react-bootstrap";
import React, { useState, useRef, Fragment } from "react";
import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
import { inboxActions } from "../../Store/inbox-reducer";
import { sentActions } from "../../Store/sent-reducer";

const NewMail = () => {
  const dispatch = useDispatch();
  const emailInput = useRef(null);
  const subjectInput = useRef(null);
  const editorContent = useRef(null);
  const [content, setContent] = useState("");
  var today = new Date().toLocaleDateString();
  var time = new Date().toLocaleTimeString();
  const dateTime = today + " at " + time;

  const senderEmail = JSON.parse(localStorage.getItem("token")).email;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const composedMailInfo = {
      senderMail: senderEmail,
      receiverMail: emailInput.current.value,
      subject: subjectInput.current.value,
      message: editorContent.current.value,
      timings: dateTime,
      read: false,
    };

    const receiverEmail = composedMailInfo.receiverMail.replace(
      /[^a-z0-9]/gi,
      ""
    );
    const senderEMail = senderEmail.replace(/[^a-z0-9]/gi, "");

    fetch(
      `https://emails-3d016-default-rtdb.firebaseio.com/receiver${receiverEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify(composedMailInfo),
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
        alert("Sent your mail successfully");
        if (composedMailInfo.receiverMail === composedMailInfo.senderMail) {
          dispatch(inboxActions.newInboxMessage());
        }

        dispatch(sentActions.newSentMessage());
      })
      .catch((error) => console.log(error));

    fetch(
      `https://emails-3d016-default-rtdb.firebaseio.com/sender${senderEMail}.json`,
      {
        method: "POST",
        body: JSON.stringify(composedMailInfo),
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
        // console.log(data);
      })
      .catch((error) => console.log(error));

    emailInput.current.value = "";
    subjectInput.current.value = "";
    editorContent.current.value = "";
  };

  return (
    <Fragment>
      <div align="center" className="mt-3">
        <h4>
          <b>Compose Your Mail</b>
        </h4>
      </div>
      <hr />
      <Form onSubmit={formSubmitHandler} className="my-4">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailInput}
            type="email"
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Subject</Form.Label>
          <Form.Control ref={subjectInput} type="text" placeholder="Subject" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <JoditEditor
            ref={editorContent}
            value={content}
            // config={config}
            tabIndex={1} // tabIndex of textarea // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => setContent(newContent)}
          />
        </Form.Group>
        <div align="center">
          <Button className="btn-dark btn-md" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default NewMail;
