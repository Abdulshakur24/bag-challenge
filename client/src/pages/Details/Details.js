import { Box, Button, Image, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { postList } from "../../redux/slicers/myList";
import { getFullNameByISO3 } from "./countriesByISO3";
import { useStyles } from "./DetailsStyle";

const Border = ({ iso3 }) => {
  const { classes } = useStyles();

  const name = getFullNameByISO3(iso3)?.name;
  if (!name) return null;

  return (
    <Box className={classes.border}>
      <Text>{name}</Text>
    </Box>
  );
};

function Details() {
  const { area } = useParams();
  const navigator = useNavigate();

  const { classes } = useStyles();

  const [details, setDetails] = useState([]);

  const user = useSelector((state) => state.user.data);
  const { data: toVisit } = useSelector((state) => state.toVisit);
  const { data: visited } = useSelector((state) => state.visited);
  const { data: list, status } = useSelector((state) => state.myList);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const getCountryByName = () => {
      const country = [];

      for (let i = 0; i < toVisit.length; i++) {
        if (`${toVisit[i].area}` === area) {
          country.push(toVisit[i]);
          break;
        }
      }

      if (!country.length) {
        const visitedCountry = [];
        for (let i = 0; i < visited.length; i++) {
          if (`${visited[i].area}` === area) {
            visitedCountry.push(visited[i]);
          }
        }
        return setDetails(visitedCountry);
      }
      setDetails(country);
    };
    getCountryByName();
  }, [area, toVisit, visited]);

  const handleNativeName = (nativeName) => {
    let native = "";
    for (const [key, value] of Object.entries(nativeName)) {
      if (key === "nld") return value.common;
      native = value.common;
    }
    return native;
  };

  const handleCurrencies = (currencies) => {
    for (const value of Object.values(currencies)) {
      return value.name;
    }
    return null;
  };

  const handleLanguages = (languages) => {
    const langs = [];
    for (const value of Object.values(languages)) {
      langs.push(value);
    }
    return langs;
  };

  const concatSentence = (array = []) => {
    let sentence = "";
    for (let i = 0; i < array.length; i++) {
      if (array[i + 1] === undefined) {
        sentence += array[i] + ".";
      } else sentence += array[i] + ", ";
    }
    return sentence;
  };

  const saveToMyList = () => {
    showNotification({
      message: `${details[0].name.common} added to the list!`,
      autoClose: 3000,
    });
    dispatch(postList({ object: details[0], token: user.token }));
  };

  const isObjectInList = () => {
    let isFound = false;
    for (let object of list) {
      for (let i = 0; i < details.length; i++) {
        if (details[i].area === object.area) {
          isFound = true;
          break;
        }
      }
    }
    return isFound;
  };

  return (
    <Box className={classes.body}>
      <Box className={classes.filterWrapper}>
        <Button onClick={() => navigator(-1)}>Go Back</Button>
        {!isObjectInList() ? (
          <Button
            disabled={status === "loading"}
            onClick={saveToMyList}
            className={classes.listBtn}
          >
            Add to the list
          </Button>
        ) : null}
      </Box>
      {details.map(
        ({
          name,
          flags,
          borders,
          population,
          subregion,
          capital,
          tld,
          currencies,
          languages,
          region,
          area,
        }) => (
          <Box key={area} className={classes.container}>
            <Box className={classes.imageWrapper}>
              <Image
                className={classes.image}
                src={flags.svg}
                alt={name.common}
              />
            </Box>
            <Box className={classes.detailsWrapper}>
              <Box className={classes.details}>
                <Box className={classes.topSection}>
                  <Text className={classes.title} weight={700} size="lg">
                    {name.common}
                  </Text>
                  <Box className={classes.display}>
                    <Text weight={600} size="md">
                      Native Name:
                    </Text>
                    <Text>{handleNativeName(name.nativeName)}</Text>
                  </Box>
                  <Box className={classes.display}>
                    <Text weight={600} size="md">
                      Population:
                    </Text>
                    <Text>{population.toLocaleString()}</Text>
                  </Box>
                  <Box className={classes.display}>
                    <Text weight={600} size="md">
                      Region:
                    </Text>
                    <Text> {region}</Text>
                  </Box>
                  <Box className={classes.display}>
                    <Text weight={600} size="md">
                      Sub Region:
                    </Text>
                    <Text>{subregion}</Text>
                  </Box>
                  <Box className={classes.display}>
                    <Text weight={600} size="md">
                      capital:
                    </Text>
                    <Text>
                      {capital ? capital.map((string) => string) : "N/A"}
                    </Text>
                  </Box>
                </Box>
                <Box className="mid-section">
                  <Box className={classes.display}>
                    <Text weight={600} size="md">
                      Top Level Domain:
                    </Text>
                    <Text>{tld.map((string) => string)}</Text>
                  </Box>
                  <Box className={classes.display}>
                    <Text weight={600} size="md">
                      Currencies:
                    </Text>
                    <Text>{handleCurrencies(currencies)}</Text>
                  </Box>
                  <Box className={classes.display}>
                    <Text weight={600} size="md">
                      Languages:
                    </Text>
                    <Text>{concatSentence(handleLanguages(languages))}</Text>
                  </Box>
                </Box>
                <Box className="bottom-section">
                  {borders ? (
                    <Text className={classes.title} weight={700} size="lg">
                      Border Countries:
                    </Text>
                  ) : null}
                  {borders && (
                    <Box className={classes.borders}>
                      {borders
                        ? borders.map((iso3, index) => (
                            <Border key={index} iso3={iso3} />
                          ))
                        : null}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
}

export default Details;
