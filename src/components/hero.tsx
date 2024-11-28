import { HeroDetails } from "@/types/hero.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = ({ image, title, text, links }: HeroDetails) => {
  return (
    <div className="position-relative hero-image-wrapper">
      <Image
        src={image}
        alt="Hero image"
        fill
        objectFit="cover"
        className="hero-image"
      />

      {(title || text) && (
        <div className="hero-overlay d-none d-md-block">
          {title && <h1 className="hero-text">{title}</h1>}
          {text && <p className="text-center">{text}</p>}
        </div>
      )}

      <div className="hero-buttons-container d-flex flex-column flex-md-row row-gap-3 justify-content-center position-absolute top-50 start-50 translate-middle">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="hero-buttons btn btn-primary"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hero;
