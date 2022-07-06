import { Dispatch } from "react";

export interface CountryProps {
  name: {
    common: string;
    official: string;
    nativeName?: any;
  };
  inViewport?: any;
  forwardedRef?: any;
  info?: any;
  setDetails?: any;
  setActiveTab?: any;
  tld?: string[];
  cca2?: string;
  ccn3?: string;
  cca3?: string;
  cioc?: string;
  independent?: boolean;
  status?: string;
  unMember?: true;
  currencies?: any;
  idd?: { root: string; suffixes: string[] };
  capital?: string[] | null | undefined;
  altSpellings?: string[];
  region: string;
  subregion?: string;
  languages?: object;
  hasVisited?: boolean | undefined;
  translations?: any | null;
  latlng?: [number, number];
  landlocked?: boolean;
  borders?: string[];
  area?: number;
  demonyms?: any | null;
  flag?: string;
  maps?: any;
  population: number;
  gini?: any;
  fifa?: string;
  car?: any;
  timezones?: string[];
  continents?: string[];
  flags: {
    png: string;
    svg: string;
  };
  startOfWeek?: string;
  capitalInfo?: { latlng: [number, number] } | any;
  postalCode?: { format: string; regex: string } | any;
}

export interface SearchGloballyProps {
  query: string;
}

export interface BorderProps {
  iso3: string;
}

export interface ToggleProps {
  toggle: { burger?: boolean; search?: boolean; modal?: boolean };
  setToggle: Dispatch<
    React.SetStateAction<{
      burger: boolean;
      search: boolean;
      modal: boolean;
    }>
  >;
}

export interface postVisitProps {
  object: any;
  token: string;
}

export interface getFullNameByISO3Interface {
  id: number;
  name: string;
  iso3: string;
}

export interface ThemeProps {
  setPrimaryColor: Dispatch<React.SetStateAction<string>>;
}

export interface themeProps {
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  colors: {
    brown: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
  };
  transitionTimingFunction: string;
}

export interface PathNameContextProps {
  pathName: string;
  setPathName: Dispatch<React.SetStateAction<string>>;
}
