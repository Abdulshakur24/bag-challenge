import React from "react";
import { useSelector } from "react-redux";
import Country from "./Country";
import { MyListContainer, MyListWrapper } from "./MyListStyle";

function MyList() {
  const myList = useSelector((state) => state.list.data);

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

export default MyList;
