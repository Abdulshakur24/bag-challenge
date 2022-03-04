import React from "react";
import { useSelector } from "react-redux";
import Country from "./Country";
import { VisitedWrapper } from "./VisitedStyle";

function Visited() {
  const visited = useSelector((state) => state.visited);
  return (
    <VisitedWrapper>
      {visited.data.map((props) => (
        <Country
          key={props.name.common}
          name={props.name}
          flags={props.flags}
          population={props.population}
          region={props.region}
          capital={props.capital}
          info={props}
        />
      ))}
    </VisitedWrapper>
  );
}

export default Visited;
