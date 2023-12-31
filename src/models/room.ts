interface CoverImage {
  url: string;
}

export interface Image {
  _key: string;
  url: string;
}

interface Amenity {
  _key: string;
  amenity: string;
  icon: string;
}

interface Slug {
  _type: string;
  current: string;
}

export interface Room {
  _id: string;
  coverImage: CoverImage;
  description: string;
  dimension: string;
  discount: number;
  images: Image[];
  isBooked: boolean;
  isFeatured: boolean;
  name: string;
  numberOfBeds: number;
  offeredAmenities: Amenity[];
  price: number;
  slug: Slug;
  specialNote: string;
  type: string;
}

export interface CreateBookingDto {
  user: string;
  hotelRoom: string;
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
}
