import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postVisit } from "../../../../../../redux-app/slicers/visited";
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
} from "./ToVisitStyle";

function Country(props) {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);

  const handleNavigator = () => {
    navigator(props.name.official);
    dispatch(postVisit({ object: props.info, token: user.token }));
  };

  return (
    <CountryWrapper
      transition={{ duration: 0.25 }}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <CountryContainer onClick={handleNavigator}>
        <Top>
          <Image src={props.flags.png} alt={props.name.common} />
        </Top>
        <Bottom>
          <Name>{props.name.common}</Name>
          <Population>
            Population: {props.population.toLocaleString()}
          </Population>
          <Region>Region: {props.region}</Region>
          <Capital>Capital: {props.capital ? props.capital[0] : "N/A"}</Capital>
        </Bottom>
      </CountryContainer>
    </CountryWrapper>
  );
}

export default Country;
