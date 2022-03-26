import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Country from "./Country";
import {
  EmptyVisitedContainer,
  EmptyVisitedWrapper,
  VisitedWrapper,
} from "./VisitedStyle";

function Visited() {
  const { data: visited, status } = useSelector((state) => state.visited);

  if (!visited.length && status !== "loading") return <EmptyVisited />;

  return (
    <VisitedWrapper>
      {visited.map((props) => (
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

const EmptyVisited = () => {
  const navigator = useNavigate();
  return (
    <EmptyVisitedWrapper>
      <EmptyVisitedContainer>
        <h1>You haven't visited any country so far.</h1>
        <p>Click here to explore countries!</p>
        <button onClick={() => navigator("/home/to-visit")}>Explore!</button>
      </EmptyVisitedContainer>
    </EmptyVisitedWrapper>
  );
};

export default Visited;
