import { Anchor, Box, Skeleton, Text } from "@mantine/core";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Country } from "../../components";
import { PathNameContext } from "../Layout/Layout";
import { useStyles } from "./MyListStyle";
import handleViewport from "react-in-viewport";
import { Link } from "react-router-dom";

const ViewportCountry = handleViewport(Country, { threshold: 0 });

function MyList() {
  const { setPathName } = useContext(PathNameContext);

  const { data: myList, status } = useSelector((state) => state.myList);

  useEffect(() => {
    setPathName("My List");
  }, [setPathName]);

  const { classes } = useStyles();

  return myList.length ? (
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
  ) : (
    <MyListNotFound />
  );
}

function MyListNotFound() {
  const { classes } = useStyles();

  return (
    <Box className={classes.notFoundWrapper}>
      <Box className={classes.content}>
        <Text mb={20} className={classes.text}>
          You haven't added any country to your list.
        </Text>
        <Anchor component={Link} to="/home">
          Start visiting!
        </Anchor>
      </Box>
    </Box>
  );
}

export default MyList;
