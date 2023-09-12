import { Button, Form } from "react-bootstrap";
import React, { useState, useRef, Fragment } from "react";
import JoditEditor from "jodit-react";

const NewMail = () => {
  const emailInput = useRef(null);
  const subjectInput = useRef(null);
  const editorContent = useRef(null);
  const [content, setContent] = useState("");
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const senderEmail = JSON.parse(localStorage.getItem("token")).email;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const composedMailInfo = {
      senderMail: senderEmail,
      receiverMail: emailInput.current.value,
      subject: subjectInput.current.value,
      message: editorContent.current.value,
      timings: dateTime,
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
        console.log(data);
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
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <Form onSubmit={formSubmitHandler} className="my-5">
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
        <Button type="submit">Submit</Button>
      </Form>
    </Fragment>
  );
};

export default NewMail;
