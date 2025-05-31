import { JSX } from 'react';
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Link from "next/link";

interface CardWithArrowProps {
    name: string,
    pageLink: string,
}

export const CardWithArrow = ({ name, pageLink }: CardWithArrowProps): JSX.Element => {
  return (
    <>
      <Link
        href={`/${pageLink}`}
        className="absolute top-6 right-6 text-black hover:text-black transition-colors transform hover:scale-110 duration-600 ease-in-out"
      >
        <ArrowOutwardIcon className="w-6 h-6" />
      </Link>
      <h2 className="absolute bottom-6 left-6 text-3xl font-medium text-black">
        {name}
      </h2>
      <p className="invisible text-xl font-medium">
        We are committed to our core values and our team of coaches helps to
        encourage them.
      </p>
    </>
  );
}

