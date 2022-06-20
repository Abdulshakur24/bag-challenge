import {
  Box,
  Button,
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postVisit } from "src/redux/slicers/visited";
import { useStyles } from "./CountryStyle";
import { trimEllip } from "src/utils/helpers";
import { CountryProps } from "src/types/defaults";
import { AppDispatch, RootState } from "src/redux/store";

function Country({
  flags,
  name,
  population,
  region,
  capital,
  area,
  hasVisited,
  info,
}: CountryProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();
  const { data: user } = useSelector(
    (state: RootState) => state.user,
    shallowEqual
  );

  const { classes } = useStyles();

  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const handleNavigator = () => {
    navigator(`/home/${area}`);
    showNotification({
      message: `${name.common} marked as 'Visited'.`,
      autoClose: 3000,
    });

    dispatch(postVisit({ object: info, token: user.token }));
  };

  return (
    <Box className={classes.box}>
      {
        <Card shadow="sm" p="lg">
          <Card.Section>
            <Image
              className={classes.image}
              src={flags.svg}
              alt={name.common}
              height="150px"
            />
          </Card.Section>

          <Group
            position="apart"
            style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
          >
            <Text size="lg" weight={500}>
              {trimEllip(name.common)}
            </Text>
          </Group>

          <Box className={classes.textWrapper}>
            <Text weight={600} size="md">
              Population:
            </Text>
            <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
              {population.toLocaleString()}
            </Text>
          </Box>
          <Box className={classes.textWrapper}>
            <Text weight={600} size="md">
              Region:
            </Text>
            <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
              {region}
            </Text>
          </Box>
          <Box className={classes.textWrapper}>
            <Text weight={600} size="md">
              Capital:
            </Text>
            <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
              {capital ? capital[0] : "N/A"}
            </Text>
          </Box>

          <Button
            onClick={
              hasVisited ? () => navigator(`/home/${area}`) : handleNavigator
            }
            fullWidth
            style={{ marginTop: 14 }}
          >
            {hasVisited ? "Re-visit" : "Visit"}
          </Button>
        </Card>
      }
    </Box>
  );
}

export default Country;
