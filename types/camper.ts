export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: "alcove" | "panel_van" | "integrated" | "semi_integrated";
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: "automatic" | "manual";
  engine: "diesel" | "petrol" | "hybrid" | "electric";
  amenities: Array<
    | "ac"
    | "bathroom"
    | "kitchen"
    | "tv"
    | "radio"
    | "refrigerator"
    | "microwave"
    | "gas"
    | "water"
  >;
  coverImage: string;
  totalReviews: number;
  description?: string;
  gallery?: Array<{ thumb: string; original: string }>;
  reviews?: Array<{
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }>;
}
export interface CamperListResponseDto {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface FiltersResponseDto {
  forms: string[];
  transmissions: string[];
  engines: string[];
}

export interface CamperImageEntity {
  id: string;
  camperId: string;
  imageUrl: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperDetailsEntity {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: "alcove" | "panel_van" | "integrated" | "semi_integrated";
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: "automatic" | "manual";
  engine: "diesel" | "petrol" | "hybrid" | "electric";
  amenities: Array<
    | "ac"
    | "bathroom"
    | "kitchen"
    | "tv"
    | "radio"
    | "refrigerator"
    | "microwave"
    | "gas"
    | "water"
  >;
  coverImage: string;
  totalReviews: number;
  description: string;
  gallery: CamperImageEntity[];
  createdAt: string;
  updatedAt: string;
}

export interface ReviewEntity {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt?: string;
}

export interface BookingRequestDto {
  name: string;
  email: string;
  bookingDate?: string;
  comment?: string;
}

export interface BookingRequestResponseDto {
  message: string;
}
