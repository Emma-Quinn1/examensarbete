"use client";

import React from "react";
import heroImage from "../img/hero.png";
import Hero from "../components/hero";
import { Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Hero
        image={heroImage}
        title="FurEverHome"
        text="Ge ditt husdjur ett kärleksfullt hem - adoptera eller omplacera idag!"
        links={[
          { href: "/signUp", label: "Bli medlem" },
          { href: "/logIn", label: "Logga in" },
        ]}
      />

      <Container>
        <div className="d-flex justify-content-center align-items-center text-center mt-3 p-3 flex-wrap">
          <h1 className="mb-4 fs-1 fw-light">Välkommen till FurEverHome</h1>
          <h2 className="mb-3 fs-2 fw-light">
            På FurEverHome brinner vi för att skapa en trygg och kärleksfull
            framtid för alla husdjur. Vi är en plattform där djurälskare kan
            mötas för att adoptera eller omplacera husdjur som behöver ett nytt
            hem.
          </h2>
        </div>

        <p className="mt-3 mb-5 p-3 text-center fs-4 fw-light">
          Vår plattform är skapad för att göra processen enkel, säker och
          stressfri - vi finns vi här för dig. <br />
          Tillsammans kan vi hjälpa fler husdjur att hitta sitt &quot;FurEver
          Home&quot;.
        </p>

        <Row className="justify-content-center mt-5 gap-3 gap-lg-5 gap-xl-5">
          <Col
            xl={5}
            lg={5}
            md={10}
            xs={12}
            className="mb-4 d-flex align-items-stretch"
          >
            <Card className="w-100 card-hompage login-card p-5">
              <Card.Body>
                <Card.Title className="fw-medium mb-4 fs-5 lh-base">
                  Adoptera ett djur och ge dem ett liv fyllt av omsorg och
                  kärlek.
                </Card.Title>
                <p className="fs-light fs-6 lh-base">
                  Att adoptera ett djur innebär att ge en ny chans till ett
                  husdjur som behöver ett kärleksfullt hem. Genom adoption får
                  du en trogen vän samtidigt som du gör en skillnad i ett djurs
                  liv. Varje adoption är en möjlighet att skapa en livslång
                  relation fylld med kärlek och glädje.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col
            xl={5}
            lg={5}
            md={10}
            xs={12}
            className="mb-4 d-flex align-items-stretch"
          >
            <Card className="w-100 card-hompage login-card p-5">
              <Card.Body>
                <Card.Title className="fw-medium mb-4 fs-5 lh-base">
                  Omplacera ditt husdjur till en ny, pålitlig familj om
                  livssituationen förändras.
                </Card.Title>
                <p className="fs-light fs-6 lh-base">
                  Att omplacera ett djur kan vara ett svårt beslut, men det kan
                  ge djuret en tryggare framtid. Genom omplacering hjälper du
                  ditt husdjur att hitta ett hem som bättre passar dess behov.
                  Det är en handling av kärlek och ansvar att ge ett djur en ny
                  start i livet.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <p className="mt-3 mb-5 p-3 text-center fs-4 fw-light">
          För att utnyttja våra tjänster måste du skapa ett konto. Du gör detta
          lätt genom att bli medlem.
        </p>

        <div className="d-flex justify-content-center mb-5">
          <Link
            href="/signUp"
            className="signUp-btn text-decoration-none btn mb-5 fw-semibold p-2"
            role="button"
          >
            Bli medlem
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Home;
