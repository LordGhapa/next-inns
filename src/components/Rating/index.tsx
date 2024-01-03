import React from "react";
import { FaStar } from "react-icons/fa";

interface Props {
  rating: number;
}

export default function Rating({ rating }: Props) {
  // const fullStars = Math.floor(rating);
  // const decimalPart = rating - fullStars;

  const fullStarElements = Array(rating).fill(<FaStar />);

  // const halfStarElement = null;

  // if (decimalPart > 0) {
  //   halfStarElement = <FaStarHalf />;
  // }

  return (
    <>
      {fullStarElements.map((el, index) => (
        <React.Fragment key={index}>{el}</React.Fragment>
      ))}
    </>
  );
}
