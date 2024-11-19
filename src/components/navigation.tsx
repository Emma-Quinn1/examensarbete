import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";
import Link from "next/link";

const Navigation = () => {
  return (
    <Navbar expand="sm" className="navbar navbar-dark bg-dark">
      <Container>
        <NavbarBrand>
          <Link href="/">FurEverHome 🐶</Link>
        </NavbarBrand>

        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse className="justify-content-end">
          <Link href="/member" className="me-3 mb-2 navbar-link">
            Bli medlem
          </Link>
          <Link href="/login" className="me-3 mb-2 navbar-link">
            Logga in
          </Link>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
