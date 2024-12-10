"use client";

import { useState } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const Navigation = () => {
  const { currentUser, userEmail, userName } = useAuth();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

  return (
    <>
      <Navbar expand="lg" className="navbar navbar-dark bg-dark">
        <Container>
          <NavbarBrand>
            <Link href="/">FurEverHome 🐶</Link>
          </NavbarBrand>

          <NavbarToggle
            aria-controls="offcanvasNavbar"
            onClick={handleShow}
            className="d-lg-none"
          />

          <NavbarCollapse className="justify-content-end d-none d-lg-flex">
            {currentUser ? (
              <NavDropdown
                title={userName || userEmail || "Användare"}
                id="user-nav-dropdown"
                className="me-3 mb-2 navbar-link"
              >
                <div className="dropdown-item">
                  <Link href="/logOut">Logout</Link>
                </div>
                <div className="dropdown-item">
                  <Link href="/updateProfile">Uppdatera profil</Link>
                </div>
                <div className="dropdown-item">
                  <Link href="/relocate">Omplacera</Link>
                </div>
                <div className="dropdown-item">
                  <Link href="/adopt">Adoptera</Link>
                </div>
                <div className="dropdown-item">
                  <Link href="/blog/create">Skapa blogginlägg</Link>
                </div>
                <div className="dropdown-item">
                  <Link href="/blog">Blogg</Link>
                </div>
                <div className="dropdown-item">
                  <Link href="/message/chatApp">Chat</Link>
                </div>
              </NavDropdown>
            ) : (
              <>
                <Link href="/signUp" className="me-3 mb-2 navbar-link">
                  Bli medlem
                </Link>
                <Link href="/logIn" className="me-3 mb-2 navbar-link">
                  Logga in
                </Link>
                <Link href="/blog" className="me-3 mb-2 navbar-link">
                  Blogg
                </Link>
              </>
            )}
          </NavbarCollapse>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{userName || userEmail || "Meny"}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group">
            {currentUser ? (
              <>
                <li className="list-group-item">
                  <Link href="/logOut" onClick={handleClose}>
                    Logout
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/updateProfile" onClick={handleClose}>
                    Uppdatera profil
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/relocate" onClick={handleClose}>
                    Omplacera
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/adopt" onClick={handleClose}>
                    Adoptera
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/blog/create" onClick={handleClose}>
                    Skapa blogginlägg
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/blog" onClick={handleClose}>
                    Blogg
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/message/chatApp" onClick={handleClose}>
                    Chat
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="list-group-item">
                  <Link href="/signUp" onClick={handleClose}>
                    Bli medlem
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/logIn" onClick={handleClose}>
                    Logga in
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/blog" onClick={handleClose}>
                    Blogg
                  </Link>
                </li>
              </>
            )}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigation;
