"use client";

import React from "react";
import heroImage from "../../img/hero-dashboard.jpg";
import Hero from "@/components/hero";
import { Card, Container, Col } from "react-bootstrap";
import Link from "next/link";

const Dashboard = () => {
  return (
    <>
      <Hero
        image={heroImage}
        links={[
          { href: "/adopt", label: "Adoptera" },
          { href: "/relocate", label: "Omplacera" },
        ]}
      />

      <Container>
        <div className="d-flex justify-content-center align-items-center text-center mt-3 p-3 flex-wrap">
          <h1 className="mb-4 fs-1 fw-light">Välkommen!</h1>
          <h2 className="mb-3 fs-2 fw-light">
            Vi är glada att ha dig här igen. Tack vare dig och andra djurälskare
            bygger vi en plattform där adoption och omplacering av husdjur blir
            enklare, säkrare och mer stressfri.
          </h2>
        </div>

        <p className="mt-4 mb-1 p-3 text-center fs-4 fw-light lh-base">
          Vi vet att det inte alltid är lätt att adoptera eller omplacera ett
          husdjur – det är ett stort beslut som ofta kommer med både känslor och
          ansvar. Att ge ett djur ett nytt hem eller låta det gå vidare till
          någon annan som kan ge den kärlek och trygghet kräver omtanke, tid och
          mod.
        </p>
        <p className="mt-2 mb-5 p-3 text-center fs-4 fw-light lh-base">
          Men genom att du är här och tar detta steg visar du vilken fantastisk
          insats du gör för djurets välbefinnande. Vi finns här för att stötta
          dig genom hela processen. Med vår plattform vill vi göra det så
          enkelt, tryggt och stressfritt som möjligt för dig. Oavsett om du
          letar efter ett nytt hem för ett älskat husdjur eller välkomnar en ny
          vän in i ditt liv, är vi med dig varje steg på vägen.
        </p>

        <div className="d-flex justify-content-center mb-3">
          <Link
            href="/signUp"
            className="signUp-btn text-decoration-none btn fw-semibold p-3 mb-5 fs-5"
            role="button"
          >
            Få stöd
          </Link>
        </div>
      </Container>

      <div className="full-width-wrapper py-5 d-flex justify-content-center w-100 mt-5">
        <Col xs={11} md={8} lg={6}>
          <Card className="p-4 shadow-lg login-card">
            <Card.Body>
              <Card.Title className="fw-medium mb-5 fs-2 lh-base text-center meny">
                Meny
              </Card.Title>
              <ul className="list-group">
                <li className="dashboard-links mb-2 p-3 border-bottom border-top border-success-subtle">
                  <Link
                    href="/updateProfile"
                    className="text-decoration-none dashboard-link fs-5"
                  >
                    Uppdatera profil
                  </Link>
                </li>
                <li className="dashboard-links mb-2 p-3 border-bottom border-success-subtle">
                  <Link
                    href="/relocate"
                    className="text-decoration-none dashboard-link fs-5"
                  >
                    Omplacera
                  </Link>
                </li>
                <li className="dashboard-links mb-2 p-3 border-bottom border-success-subtle">
                  <Link
                    href="/adopt"
                    className="text-decoration-none dashboard-link fs-5"
                  >
                    Adoptera
                  </Link>
                </li>
                <li className="dashboard-links mb-2 p-3 border-bottom border-success-subtle">
                  <Link
                    href="/blog/create"
                    className="text-decoration-none dashboard-link fs-5"
                  >
                    Skapa blogginlägg
                  </Link>
                </li>
                <li className="dashboard-links mb-2 p-3 border-bottom border-success-subtle">
                  <Link
                    href="/blog"
                    className="text-decoration-none dashboard-link fs-5"
                  >
                    Blogg
                  </Link>
                </li>
                <li className="dashboard-links mb-2 p-3 border-bottom border-success-subtle">
                  <Link
                    href="/relocate/myRelocations"
                    className="text-decoration-none dashboard-link fs-5"
                  >
                    Mina omplaceringar
                  </Link>
                </li>
                <li className="dashboard-links mb-2 p-3 border-bottom border-success-subtle">
                  <Link
                    href="/message/chatApp"
                    className="text-decoration-none dashboard-link fs-5"
                  >
                    Chat
                  </Link>
                </li>
                <li className="dashboard-links mb-4 p-3 border-bottom border-success-subtle">
                  <Link
                    href="/logOut"
                    className="text-decoration-none dashboard-link fs-5"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default Dashboard;
