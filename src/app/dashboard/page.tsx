import React from "react";
import heroImage from "../../img/hero-dashboard.jpg";
import Hero from "@/components/hero";

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

      <div>
        <h2 className="mt-3 mb-4 ps-4 pe-4">Välkommen</h2>
      </div>
    </>
  );
};

export default Dashboard;
