"use client";

import { useState } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggle,
  Offcanvas,
} from "react-bootstrap";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import logo from "@/img/133354-removebg-preview.png";

const Navigation = () => {
  const { currentUser, userEmail, userName } = useAuth();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

  return (
    <>
      <Navbar expand={false} className="navbar navbar-dark">
        <Container>
          <NavbarBrand>
            <Link href="/">
              <Image
                src={logo}
                alt="Logotype Furever Home"
                className="img-fluid navbar-logo"
              />
            </Link>
          </NavbarBrand>

          <NavbarToggle aria-controls="offcanvasNavbar" onClick={handleShow} />
        </Container>
      </Navbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={handleClose}
        placement="end"
        className="offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="offcavas-header w-100 d-block text-center p-2 fs-4">
            {userName || userEmail || "Meny"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group">
            {currentUser ? (
              <>
                <li className="offcanvas-links mb-2 p-3">
                  <Link
                    href="/updateProfile"
                    onClick={handleClose}
                    className="text-decoration-none navbar-link"
                  >
                    Uppdatera profil
                  </Link>
                </li>
                <li className="offcanvas-links mb-2 p-3">
                  <Link
                    href="/relocate"
                    onClick={handleClose}
                    className="text-decoration-none navbar-link"
                  >
                    Omplacera
                  </Link>
                </li>
                <li className="offcanvas-links mb-2 p-3">
                  <Link
                    href="/adopt"
                    onClick={handleClose}
                    className="text-decoration-none navbar-link"
                  >
                    Adoptera
                  </Link>
                </li>
                <li className="offcanvas-links mb-2 p-3">
                  <Link
                    href="/blog/create"
                    onClick={handleClose}
                    className="text-decoration-none navbar-link"
                  >
                    Skapa blogginlägg
                  </Link>
                </li>
                <li className="offcanvas-links mb-2 p-3">
                  <Link
                    href="/blog"
                    onClick={handleClose}
                    className="text-decoration-none navbar-link"
                  >
                    Blogg
                  </Link>
                </li>
                <li className="offcanvas-links mb-2 p-3">
                  <Link
                    href="/relocate/myRelocations"
                    onClick={handleClose}
                    className="text-decoration-none navbar-link"
                  >
                    Mina omplaceringar
                  </Link>
                </li>
                <li className="offcanvas-links mb-2 p-3">
                  <Link
                    href="/message/chatApp"
                    onClick={handleClose}
                    className="text-decoration-none navbar-link"
                  >
                    Chat
                  </Link>
                </li>
                <li className="offcanvas-links mb-2 p-3">
                  <Link
                    href="/logOut"
                    onClick={handleClose}
                    className="text-decoration-none navbar-link"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="offcanvas-links mb-2 p-3">
                  <Link
                    href="/signUp"
                    onClick={handleClose}
                    className="text-decoration-none navbar-link"
                  >
                    Bli medlem
                  </Link>
                </li>
                <li className="offcanvas-links mb-2 p-3">
                  <Link
                    href="/logIn"
                    onClick={handleClose}
                    className="text-decoration-none navbar-link"
                  >
                    Logga in
                  </Link>
                </li>
                <li className="offcanvas-links mb-2 p-3">
                  <Link
                    href="/blog"
                    onClick={handleClose}
                    className="text-decoration-none navbar-link"
                  >
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
