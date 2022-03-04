import React from "react";
import { useNavigate } from "react-router-dom";

import {
  CountryWrapper,
  CountryContainer,
  Image,
  Top,
  Bottom,
  Name,
  Population,
  Region,
  Capital,
} from "../ToVisit/ToVisitStyle";

function Country(props) {
  const navigator = useNavigate();

  const handleNavigator = () => {
    navigator(props.name.official);
  };

  return (
    <CountryWrapper>
      <CountryContainer onClick={handleNavigator}>
        <Top>
          <Image src={props.flags.svg} alt={props.name.common} />
        </Top>
        <Bottom>
          <Name>{props.name.common}</Name>
          <Population>
            Population: {props.population.toLocaleString()}
          </Population>
          <Region>Region: {props.region}</Region>
          <Capital>Capital: {props.capital[0]}</Capital>
        </Bottom>
      </CountryContainer>
    </CountryWrapper>
  );
}

export default Country;
