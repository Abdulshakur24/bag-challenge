import {
  Box,
  Button,
  Card,
  Group,
  Image,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postVisit } from "../../redux/slicers/visited";
import { useStyles } from "./CountryStyle";

// eslint-disable-next-line no-extend-native
String.prototype.trimEllip = function (length) {
  return this.length > length ? this.substring(0, length) + "..." : this;
};

function Country(props) {
  const { inViewport, forwardedRef } = props;

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state) => state.user.data);

  const { classes } = useStyles();
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const handleNavigator = () => {
    navigator(`/home/${props.area}`);
    showNotification({
      message: `${props.name.common} marked as 'Visited'.`,
      autoClose: 3000,
    });
    dispatch(postVisit({ object: props.info, token: user.token }));
  };

  return (
    <Box className={classes.box} ref={forwardedRef}>
      {inViewport ? (
        <Card shadow="sm" p="lg">
          <Card.Section>
            <Image
              loading="lazy"
              className={classes.image}
              src={props.flags.svg}
              alt={props.name.common}
              height="150px"
            />
          </Card.Section>

          <Group
            position="apart"
            style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
          >
            <Text size="lg" weight={500}>
              {props.name.common.trimEllip(25)}
            </Text>
          </Group>

          <Box className={classes.textWrapper}>
            <Text weight={600} size="md">
              Population:
            </Text>
            <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
              {props.population.toLocaleString()}
            </Text>
          </Box>
          <Box className={classes.textWrapper}>
            <Text weight={600} size="md">
              Region:
            </Text>
            <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
              {props.region}
            </Text>
          </Box>
          <Box className={classes.textWrapper}>
            <Text weight={600} size="md">
              Capital:
            </Text>
            <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
              {props.capital ? props.capital[0] : "N/A"}
            </Text>
          </Box>

          <Button
            onClick={
              props.hasVisited
                ? () => {
                    navigator(`/home/${props.area}`);
                  }
                : handleNavigator
            }
            fullWidth
            style={{ marginTop: 14 }}
          >
            {props.hasVisited ? "Re-visit" : "Visit"}
          </Button>
        </Card>
      ) : (
        <Skeleton width={"100%"} height="339.32px" />
      )}
    </Box>
  );
}

export default Country;
