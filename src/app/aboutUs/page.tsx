import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import dog from "@/img/home-dog.jpeg";
import Bob from "@/img/BOB-768x768.jpg";

const AboutUs = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center mb-5">
        <Col md={6} className="text-center">
          <Image
            src={dog}
            alt="dog sitter on a doormat with the text home"
            className="img-fluid rounded-pill shadow-lg bg-body-tertiary rounded"
            width={400}
            height={400}
            priority
          />
        </Col>
        <Col md={6}>
          <h2 className="fw-light fs-1 border-bottom border-secondary-subtle mt-4">
            Vision
          </h2>
          <p className="fs-5 fw-light lh-base">
            På FurEver Home strävar vi efter en värld där varje husdjur får ett
            tryggt, kärleksfullt och varaktigt hem. Vi vill skapa en enkel,
            säker och stressfri process för adoption och omplacering av husdjur
            – ett hem för alla, för alltid.
          </p>
        </Col>
      </Row>

      <Row className="align-items-center">
        <Col md={6}>
          <h2 className="fw-light mb-3 fs-1 border-bottom border-secondary-subtle">
            Vår historia
          </h2>
          <p className="fs-5 fw-light lh-base">
            Jag heter Emma och har alltid haft en djup kärlek för djur. Det skär
            i hjärtat att se dem fara illa, för jag är övertygad om att varje
            djur är värt ett tryggt och kärleksfullt hem – precis som vi
            människor. Allt började när jag bestämde mig för att hjälpa Bob, en
            gatuhund från Rumänien, att få ett nytt liv och ett hem hos oss. Den
            upplevelsen förändrade mig. Sedan dess har jag arbetat som volontär
            i en förening och sett på nära håll hur många hundar som behöver
            hjälp. Det är hjärtskärande att inse hur många djur som väntar på en
            ny chans, och jag drömmer om att kunna ge ett hem åt dem alla.
            Samtidigt märkte jag att många på Facebook letade efter nya hem åt
            sina husdjur av olika anledningar. Jag insåg att det saknades en
            smidig och trygg plattform för både omplacering och adoption. Därför
            skapade jag FurEver Home – en hemsida där djur kan få en ny start i
            livet och där människor som vill öppna sina hem för ett nytt djur
            kan hitta sin nya familjemedlem. <br /> <br />
            FurEver Home är för alla djur och alla djurälskare – för att
            tillsammans kan vi göra skillnad.
          </p>
        </Col>
        <Col md={6} className="text-center">
          <Image
            src={Bob}
            alt="Bob on Dogs looking for a home"
            className="img-fluid rounded-4 shadow-lg bg-body-tertiary rounded"
            width={400}
            height={400}
            priority
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
