import { Anchor, Box, Skeleton, Text } from "@mantine/core";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Country from "src/components/Country/Country";
import { PathNameContext } from "../Layout/Layout";
import { useStyles } from "./VisitedStyle";
import handleViewport from "react-in-viewport";
import { Link } from "react-router-dom";
import { RootState } from "src/redux/store";

const ViewportCountry = handleViewport(Country, { threshold: 0 });

function Visited() {
  const { setPathName } = useContext(PathNameContext);
  const { data: visited, status } = useSelector(
    (state: RootState) => state.visited
  );

  useEffect(() => {
    setPathName(() => "Visited");
  }, [setPathName]);

  const { classes } = useStyles();

  return visited.length ? (
    <Box className={classes.body}>
      {visited.map((props) => (
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
    <VisitedNotFound />
  );
}

function VisitedNotFound() {
  const { classes } = useStyles();

  return (
    <Box className={classes.notFoundWrapper}>
      <Box className={classes.content}>
        <Text mb={20} className={classes.text}>
          You haven't visited any country.
        </Text>
        <Anchor component={Link} to="/home">
          Start visiting!
        </Anchor>
      </Box>
    </Box>
  );
}

export default Visited;
