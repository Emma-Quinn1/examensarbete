import { Col, Nav, Row, Stack } from "react-bootstrap";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <Row className="bg-dark p-4">
        <Col className="pt-3 pb-3" xs={12} md={4}>
          <Stack>
            <Link href="/">FurEverHome 🐶</Link>
          </Stack>
        </Col>

        <Col xs={12} md={4}>
          <Nav className="flex-column">
            <Link href="/" className="me-3 mb-2 navbar-link">
              Kontakt
            </Link>
            <Link href="/" className="me-3 mb-2 navbar-link">
              Om oss
            </Link>
          </Nav>
        </Col>

        <Col>
          <Nav className="flex-column">
            <Link href="/signUp" className="me-3 mb-2 navbar-link">
              Bli medlem
            </Link>
            <Link href="/" className="me-3 mb-2 navbar-link">
              Blogg
            </Link>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
