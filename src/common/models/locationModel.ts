export interface Location {
  items: Item[];
}

export interface Item {
  title: string;
  id: string;
  language: string;
  politicalView: string;
  resultType: string;
  houseNumberType: string;
  localityType: string;
  administrativeAreaType: string;
  address: Address;
  distance: number;
  highlights: Highlights;
  streetInfo: StreetInfo[];
}

export interface Address {
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  state: string;
  countyCode: string;
  county: string;
  city: string;
  district: string;
  subdistrict: string;
  street: string;
  block: string;
  subblock: string;
  postalCode: string;
  houseNumber: string;
  building: string;
}

export interface Highlights {
  title: Title[];
}

export interface Title {
  start: number;
  end: number;
}

export interface StreetInfo {
  baseName: string;
  streetType: string;
  streetTypePrecedes: boolean;
  streetTypeAttached: boolean;
  prefix: string;
  suffix: string;
  direction: string;
  language: string;
}
