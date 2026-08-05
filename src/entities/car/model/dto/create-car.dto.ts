export interface CreateCarDto {
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

  brandId: number;
}