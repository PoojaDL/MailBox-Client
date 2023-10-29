import { Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import htmlToFormattedText from "html-to-formatted-text";

const ReadMessage = (props) => {
  const goBack = (e) => {
    e.preventDefault();
    props.setRead(false);
  };

  return (
    <Fragment>
      <Button onClick={goBack} className="btn-light p-1 mt-3">
        <img
          style={{ width: "40px", height: "40px" }}
          src="https://cdn-icons-png.flaticon.com/128/10009/10009447.png"
          alt="up-arrow"
        />
      </Button>

      <h3 className="ps-5 pt-3">{props.getData.subject}</h3>
      <div>
        <Row>
          <Col className="col-1 p-auto m-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
              alt="profileIcon"
              width="45px"
              height="45px"
              style={{ margin: "0px" }}
            />
          </Col>
          <Col className="col-11 col-md-6 ps-3 ps-md-3 m-0">
            <div className="ms-4 ms-md-0">
              <p className="m-0">
                <b>Sender: </b>
                {props.getData.senderMail}
              </p>
              <p className="m-0">
                <b>Receiver: </b>
                {props.getData.receiverMail}
              </p>
            </div>
          </Col>
          <Col className="col-12 col-md-5">
            <p className="m-0 mt-3 ms-3 m-md-0">{props.getData.timings}</p>
          </Col>
        </Row>
        <div
          className="mx-auto mt-2 p-3"
          style={{
            background: "#EFF3F6",
            borderRadius: "10px",
            width: "95%",
            height: "100%",
            overflow: "auto",
          }}
        >
          <p style={{ maxwidth: "fit-content" }}>
            {htmlToFormattedText(props.getData.message)}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default ReadMessage;
