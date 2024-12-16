import { Col, Nav, Row, Stack } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import logo from "@/img/133354-removebg-preview.png";

const Footer = () => {
  return (
    <footer className="w-100">
      <Row className="p-4">
        <Col className="pt-3 pb-3" xs={12} md={4}>
          <Stack>
            <Link href="/">
              <Image
                src={logo}
                alt="Logotype Furever Home"
                className="img-fluid navbar-logo"
                priority
              />
            </Link>
          </Stack>
        </Col>

        <Col xs={12} md={4}>
          <Nav className="flex-column pt-4">
            <Link
              href="/"
              className="me-3 mb-2 footer-link fs-5 text-decoration-none"
            >
              Kontakt
            </Link>
            <Link
              href="/"
              className="me-3 mb-2 footer-link fs-5 text-decoration-none"
            >
              Om oss
            </Link>
          </Nav>
        </Col>

        <Col>
          <Nav className="flex-column pt-4">
            <Link
              href="/signUp"
              className="me-3 mb-2 footer-link fs-5 text-decoration-none"
            >
              Bli medlem
            </Link>
            <Link
              href="/blog"
              className="me-3 mb-2 footer-link fs-5 text-decoration-none"
            >
              Blogg
            </Link>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
