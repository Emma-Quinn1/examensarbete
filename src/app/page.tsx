import React from "react";
import heroImage from "../img/hero.png";
import Hero from "../components/hero";

const Home = () => {
  return (
    <>
      <Hero
        image={heroImage}
        title="Välkommen till FurEverHome"
        text="Ge ditt husdjur ett kärleksfullt hem - adoptera eller omplacera idag!"
        links={[
          { href: "/signUp", label: "Bli medlem" },
          { href: "/logIn", label: "Logga in" },
        ]}
      />

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
    </>
  );
};

export default Home;
