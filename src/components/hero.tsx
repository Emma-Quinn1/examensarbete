import { HeroDetails } from "@/types/hero.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = ({ image, title, text, links }: HeroDetails) => {
  return (
    <div className="position-relative hero-image-wrapper w-100 d-flex justify-content-center align-items-center">
      <Image
        src={image}
        alt="Hero image"
        fill
        objectFit="cover"
        className="hero-image"
      />

      {(title || text) && (
        <div className="hero-overlay d-none d-md-block position-absolute">
          {title && <h1 className="hero-text fs-4 text-center">{title}</h1>}
          {text && <p className="text-center fs-5">{text}</p>}
        </div>
      )}

      <div className="hero-buttons-container d-flex flex-column flex-md-row row-gap-3 justify-content-center position-absolute top-50 start-50 translate-middle">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="hero-buttons btn p-2 fw-semibold"
            role="button"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hero;
