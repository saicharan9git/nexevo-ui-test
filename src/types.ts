export interface User {
  id?: number;
  name: string;
  code?: string;
  countries: string[];
}

export interface CountryOption {
  label: string;
  value: string;
}

