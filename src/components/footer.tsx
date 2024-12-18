"use client";
import { Col, Container, Nav, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import logo from "@/img/133354-removebg-preview.png";
import useAuth from "@/hooks/useAuth";

const Footer = () => {
  const { currentUser } = useAuth();

  return (
    <footer className="w-100 text-white">
      <Container fluid className="ps-4 pe-5">
        <Row className="p-4 align-items-start justify-content-between">
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-start mb-3 mb-md-0"
          >
            {currentUser ? (
              <Link href="/dashboard">
                <Image
                  src={logo}
                  alt="Logotype Furever Home"
                  className="img-fluid navbar-logo"
                  priority
                />
              </Link>
            ) : (
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logotype Furever Home"
                  className="img-fluid navbar-logo"
                  priority
                />
              </Link>
            )}
          </Col>

          <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
            <Nav className="flex-column align-items-start">
              <Link
                href="/aboutUs"
                className="footer-link fs-5 text-decoration-none text-white mb-2"
              >
                Om oss
              </Link>
              <Link
                href="/blog"
                className="footer-link fs-5 text-decoration-none text-white"
              >
                Blogg
              </Link>
            </Nav>
          </Col>

          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-end flex-column"
          >
            <p className="mb-1 fs-6 text-md-end">
              Adress: Valborgsgatan 7A 216 13 <br /> Telefon: 072-2188010
            </p>
            <p className="mb-0 fs-6 text-md-end">
              &copy; {new Date().getFullYear()} FurEver Home. Alla rättigheter
              förbehållna.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
