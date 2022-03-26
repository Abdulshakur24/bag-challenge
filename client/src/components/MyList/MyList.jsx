import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Country from "./Country";
import {
  MyListContainer,
  MyListWrapper,
  EmptyListWrapper,
  EmptyListContainer,
} from "./MyListStyle";

function MyList() {
  const { data: myList, status } = useSelector((state) => state.list);

  if (!myList.length && status !== "loading") return <EmptyList />;

  return (
    <MyListWrapper>
      <MyListContainer>
        {myList.map((props) => (
          <Country
            key={props.name.common}
            id={props._id}
            name={props.name}
            flags={props.flags}
            population={props.population}
            region={props.region}
            capital={props.capital}
            info={props}
          />
        ))}
      </MyListContainer>
    </MyListWrapper>
  );
}

const EmptyList = () => {
  const navigator = useNavigate();
  return (
    <EmptyListWrapper>
      <EmptyListContainer>
        <h1>You haven't added any country to the list.</h1>
        <p>Click here to explore countries!</p>
        <button onClick={() => navigator("/home/to-visit")}>Explore!</button>
      </EmptyListContainer>
    </EmptyListWrapper>
  );
};
export default MyList;
