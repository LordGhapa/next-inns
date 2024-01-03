import { FaStar, FaStarHalf } from "react-icons/fa";

interface Props {
  rating: number;
}

export default function Rating({ rating }: Props) {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;

  const fullStarElements = Array(fullStars).fill(<FaStar />);

  let halfStarElement = null;

  if (decimalPart > 0) {
    halfStarElement = <FaStarHalf />;
  }

  return (
    <>
      {fullStarElements} {halfStarElement}
    </>
  );
}
