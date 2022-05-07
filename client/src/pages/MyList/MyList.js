import { Box, Skeleton } from "@mantine/core";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Country } from "../../components";
import { ToggleContext } from "../Layout/Layout";
import { useStyles } from "./MyListStyle";
import handleViewport from "react-in-viewport";

const ViewportCountry = handleViewport(
  Country,
  { threshold: 0 } /** options: {}, config: {} **/
);
function MyList() {
  const { setPathName } = useContext(ToggleContext);

  const { data: myList, status } = useSelector((state) => state.myList);

  useEffect(() => {
    setPathName("My List");
  }, [setPathName]);

  const { classes } = useStyles();

  return (
    <Box className={classes.body}>
      {myList.map((props) => (
        <Skeleton key={props.area} visible={status === "loading"}>
          <ViewportCountry
            area={props.area}
            name={props.name}
            flags={props.flags}
            population={props.population}
            region={props.region}
            capital={props.capital}
            info={props}
            hasVisited={true}
          />
        </Skeleton>
      ))}
    </Box>
  );
}

export default MyList;
