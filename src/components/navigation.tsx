"use client";

import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const Navigation = () => {
  const { currentUser, userEmail, userName } = useAuth();

  return (
    <Navbar expand="sm" className="navbar navbar-dark bg-dark">
      <Container>
        <NavbarBrand>
          <Link href="/">FurEverHome 🐶</Link>
        </NavbarBrand>

        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse className="justify-content-end">
          {currentUser ? (
            <>
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
                  <Link href="/message/chatApp">chat</Link>
                </div>
              </NavDropdown>
            </>
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
  );
};

export default Navigation;
