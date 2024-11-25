import Image from "next/image";
import React from "react";
import hero from "../img/hero.png";
import Link from "next/link";

const Home = () => {
  return (
    <div className="position-relative">
      <div className="hero-image-wrapper">
        <Image
          src={hero}
          alt="pets looking into the camera"
          fill
          objectFit="cover"
          className="hero-image"
        ></Image>

        <div className="hero-overlay d-none d-md-block">
          <h1 className="hero-text">Välkommen till FureverHome</h1>
          <p className="text-center">
            Ge ditt husdjur ett kärleksfullt hem - adoptera eller omplacera
            idag!
          </p>
        </div>

        <div className="hero-buttons-container d-flex flex-column flex-md-row row-gap-3 justify-content-center position-absolute top-50 start-50 translate-middle">
          <Link
            href="/signUp"
            className="hero-buttons btn btn-primary"
            role="button"
          >
            Bli medlem
          </Link>

          <Link
            href="/logIn"
            className="hero-buttons btn btn-primary"
            role="button"
          >
            Logga in
          </Link>
        </div>
      </div>

      <div>
        <h2 className="mt-3 mb-4 ps-4 pe-4">Välkommen till FurEverHome</h2>
        <p className="mb-3 ps-4 pe-4">
          På FurEverHome brinner vi för att skapa en trygg och kärleksfull
          framtid för alla husdjur. Vi är en plattform där djurälskare kan mötas
          för att adoptera eller omplacera husdjur som behöver ett nytt hem. Hos
          oss kan du:
        </p>
        <ul className="list-unstyled ps-4 pe-4">
          <li>
            <strong>Adoptera</strong> ett djur och ge dem ett liv fyllt av
            omsorg och kärlek.
          </li>
          <li>
            <strong>Omplacera</strong> ditt husdjur till en ny, pålitlig familj
            om livssituationen förändras.
          </li>
        </ul>
        <p className="mb-5 ps-4 pe-4">
          Vår plattform är skapad för att göra processen enkel, säker och
          stressfri - både för djuren och deras ägare. Oavsett om du letar efter
          en ny fyrbent vän eller behöver hjälp med att hitta ett nytt hem för
          ditt husdjur, finns vi här för dig. <br />
          Tillsammans kan vi hjälpa fler husdjur att hitta sitt &quot;FurEver
          Home&quot;.
        </p>
      </div>
    </div>
  );
};

export default Home;
