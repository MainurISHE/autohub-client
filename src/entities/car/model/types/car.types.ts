export interface Brand {
  id: number;
  name: string;
}

export interface CarImage {
  id: number;
  url: string;
  publicId: string;
  order: number;
}

export interface Car {
  id: number;
  title: string;
  description: string;
  price: number;
  year: number;
  mileage: number;
  engineVolume: number;
  horsepower: number;

  fuelType: string;
  transmission: string;
  driveType: string;
  bodyType: string;
  color: string;
  status: string;

  brand: Brand;
  images: CarImage[];
}

export interface CarsResponse {
  data: Car[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}