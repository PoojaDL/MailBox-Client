import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
const TopNavigation = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopNavigation;
