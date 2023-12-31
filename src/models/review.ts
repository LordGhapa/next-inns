export interface UpdateReviewDto {
  reviewId: string;
  reviewText: string;
  userRating: number;
}

export interface CreateReviewDto {
  hotelRoomId: string;
  reviewText: string;
  userRating: number;
  userId: string;
}

export interface Review {
  text: string;
  user: { name: string };
  userRating: number;
  _createdAt: Date;
  _id: string;
}
