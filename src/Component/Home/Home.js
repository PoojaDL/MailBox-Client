import { Fragment } from "react";
import NewMail from "./NewMail";

const Home = () => {
  return (
    <Fragment>
      <h1>
        Welcome to your <b>Mail Box</b>
      </h1>
      <NewMail />
    </Fragment>
  );
};

export default Home;
