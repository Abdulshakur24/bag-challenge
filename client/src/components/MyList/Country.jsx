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
} from "./MyListStyle";
import { ReactComponent as CheckIcon } from "../../assets/checkIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteList, updateList } from "../../redux-app/slicers/list";

function Country(props) {
  const navigator = useNavigate();
  const user = useSelector((state) => state.user.data);

  const handleNavigator = () => {
    navigator(props.name.official);
  };
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteList({ id: props.id, token: user.token }));
  };

  const handleCheck = () => {
    dispatch(
      updateList({
        id: props.id,
        visited: props.info.visited,
        token: user.token,
      })
    );
  };

  const handleCurrencies = (currencies) => {
    for (const key of Object.keys(currencies)) {
      return key;
    }
    return null;
  };

  return (
    <CountryWrapper>
      <CountryContainer onClick={handleNavigator}>
        <Top>
          <Image src={props.flags.png} alt={props.name.common} />
        </Top>
        <Bottom>
          <Name>{props.name.common}</Name>
          <Population>
            Population: {props.population.toLocaleString()}
          </Population>
          <Capital>Capital: {props.capital[0]}</Capital>
          <Region>Currency: {handleCurrencies(props.info.currencies)}</Region>
          <div onClick={(e) => e.stopPropagation()} className="icons">
            <DeleteIcon onClick={handleDelete} className="icon deleteIcon" />
            <CheckIcon
              onClick={handleCheck}
              className={`icon checkIcon ${
                props.info.visited ? "checked" : "unchecked"
              }`}
            />
          </div>
        </Bottom>
      </CountryContainer>
    </CountryWrapper>
  );
}

export default Country;