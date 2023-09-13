import { Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import htmlToFormattedText from "html-to-formatted-text";

const ReadMessage = (props) => {
  const goBack = (e) => {
    e.preventDefault();
    props.setRead(false);
  };

  console.log(props.getData);

  return (
    <Fragment>
      <Button onClick={goBack}>Back</Button>
      <h3 className="ps-5">{props.getData.subject}</h3>
      <div>
        <Row>
          <Col className="col-1 p-auto m-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
              alt="profileIcon"
              width="50px"
              height="50px"
              style={{ margin: "0px" }}
            />
          </Col>
          <Col className="col-8 ps-1 m-0">
            <div>
              <p className="m-0">{props.getData.senderMail}</p>
              <p className="m-0">To me</p>
            </div>
          </Col>
          <Col className="col-3">
            <p className="m-0">{props.getData.timings}</p>
          </Col>
        </Row>
        <div
          className="mx-auto mt-2 p-3"
          style={{
            background: "grey",
            borderRadius: "10px",
            width: "90%",
            height: "100%",
          }}
        >
          <p>{htmlToFormattedText(props.getData.message)}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ReadMessage;
