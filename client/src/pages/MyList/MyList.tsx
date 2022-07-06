import { Anchor, Box, Skeleton, Text } from "@mantine/core";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import Country from "src/components/Country/Country";
import { useStyles } from "./MyListStyle";
import { Link } from "react-router-dom";
import { RootState } from "src/redux/store";
import { usePath } from "src/contexts/PathProvider";

const MemoizedCountry = memo(Country);

function MyList() {
  const { setPathName } = usePath();

  const { data: myList, status } = useSelector(
    (state: RootState) => state.myList
  );

  useEffect(() => {
    setPathName("My List");
  }, [setPathName]);

  const { classes } = useStyles();

  return myList.length ? (
    <Box className={classes.body}>
      {myList.map((props: any) => (
        <Skeleton key={props.area} visible={status === "loading"}>
          <MemoizedCountry
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
