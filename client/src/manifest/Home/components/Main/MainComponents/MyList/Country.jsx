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
import { ReactComponent as CheckIcon } from "../../../../../../asset/checkIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../asset/deleteIcon.svg";
import { useDispatch } from "react-redux";
import {
  deleteList,
  updateList,
} from "../../../../../../redux-app/slicers/list";

function Country(props) {
  const navigator = useNavigate();

  const handleNavigator = () => {
    navigator(props.name.official);
  };
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteList(props.id));
  };
  const handleCheck = () => {
    dispatch(updateList({ id: props.id, visited: props.info.visited }));
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
          <Image src={props.flags.svg} alt={props.name.common} />
        </Top>
        <Bottom>
          <Name>{props.name.common}</Name>
          <Population>
            Population: {props.population.toLocaleString()}
          </Population>
          <Region>Region: {props.region}</Region>
          <Capital>Capital: {props.capital[0]}</Capital>
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
