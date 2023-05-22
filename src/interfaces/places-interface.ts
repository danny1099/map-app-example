export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:                   string;
  type:                 FeatureType;
  place_type:           PlaceType[];
  relevance:            number;
  properties:           Properties;
  text:                 string;
  place_name:           string;
  bbox?:                number[];
  center:               number[];
  geometry:             Geometry;
  context:              Context[];
  matching_text?:       string;
  matching_place_name?: string;
}

export interface Context {
  id:          string;
  short_code?: ShortCode;
  wikidata?:   string;
  mapbox_id:   string;
  text:        string;
}

export enum ShortCode {
  Co = "co",
  CoVac = "CO-VAC",
  It = "it",
  ItLE = "IT-LE",
}

export interface Geometry {
  type:        GeometryType;
  coordinates: number[];
}

export enum GeometryType {
  Point = "Point",
}

export enum PlaceType {
  Address = "address",
  Place = "place",
  Poi = "poi",
}

export interface Properties {
  wikidata?:   string;
  mapbox_id?:  string;
  accuracy?:   string;
  foursquare?: string;
  landmark?:   boolean;
  address?:    string;
  category?:   string;
  maki?:       string;
}

export enum FeatureType {
  Feature = "Feature",
}
