import { StaticImageData } from "next/image";

export type HeroDetails = {
  image: string | StaticImageData;
  title?: string;
  text?: string;
  links: Array<{ href: string; label: string }>;
};
