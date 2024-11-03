import { DefaultModel } from ".";
import { User } from "./user.interface";

export interface Review extends DefaultModel {
  user: User;
  destination: Destination;
  comment: string;
  rating: number;
}

export interface Destination extends DefaultModel {
  name: string;
  description: string;
  mainImage: string;
  gallery: string[];
  budget: number;
  location: number;
  reviews: Review[];
  totalReviews: number;
  totalRatings: number;
  averageRating: number;
}
