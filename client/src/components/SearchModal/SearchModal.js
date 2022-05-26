import {
  Box,
  Button,
  Card,
  Group,
  Image,
  Input,
  Modal,
  ScrollArea,
  Skeleton,
  Tabs,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import handleViewport from "react-in-viewport";
import { getFullNameByISO3 } from "../../pages/Details/countriesByISO3";
import { fetchCountry } from "../../utils/helpers";
import { useStyles } from "./SearchModalStyle";

const ViewportCountry = handleViewport(Country, { threshold: 0 });

function SearchModal({ toggle, setToggle }) {
  const { classes } = useStyles();
  const [query, setQuery] = useState("");

  const debounceQuery = debounce(setQuery);

  return (
    <Modal
      overlayBlur={5}
      size={"xl"}
      opened={toggle.search}
      onClose={() =>
        setToggle((prev) => {
          return { ...prev, search: false };
        })
      }
      title={
        <Input
          className={classes.input}
          placeholder="Search Any Country."
          onChange={(e) => debounceQuery(e.target.value)}
        />
      }
      overflow="inside"
    >
      <Box className={classes.modal}>
        <SearchGlobally query={query} />
      </Box>
    </Modal>
  );
}

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

function SearchGlobally({ query }) {
  const { classes } = useStyles();
  const [countries, setCountries] = useState([]);
  const [details, setDetails] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleFetch = async () => {
      fetchCountry(`name/${query}`, { method: "GET" })
        .then(({ data }) => {
          setCountries(data);
          // if (activeTab !== 0) setActiveTab(0);
        })
        .catch(function ({ response }) {
          if (response) {
            if (response.status === 404) {
              return showNotification({
                color: "red",
                message: `'${query}' is not a country.`,
                autoClose: 1500,
              });
            }
            showNotification({
              color: "red",
              message: response.data.message,
              autoClose: 1500,
            });
          }
        });
    };
    if (query) {
      handleFetch();
    }
  }, [query, activeTab]);

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

  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Box>
      <Tabs
        title="Global Search"
        sx={() => {
          return {
            justifyContent: "space-between",
            alignItems: "center",
          };
        }}
        active={activeTab}
        onTabChange={setActiveTab}
        grow
      >
        <Tabs.Tab label="Search">
          <ScrollArea offsetScrollbars>
            <Box className={classes.countries}>
              {countries.length ? (
                countries.map((props) => (
                  <ViewportCountry
                    key={props.area}
                    area={props.area}
                    name={props.name}
                    flags={props.flags}
                    population={props.population}
                    region={props.region}
                    capital={props.capital}
                    info={props}
                    hasVisited={true}
                    setDetails={setDetails}
                    setActiveTab={setActiveTab}
                  />
                ))
              ) : (
                <Text color={secondaryColor} align="center">
                  Please type in to search...
                </Text>
              )}
            </Box>
          </ScrollArea>
        </Tabs.Tab>
        <Tabs.Tab label="Details">
          {details.length ? (
            details.map(
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
                          <Text>
                            {concatSentence(handleLanguages(languages))}
                          </Text>
                        </Box>
                      </Box>
                      <Box className="bottom-section">
                        {borders ? (
                          <Text
                            className={classes.title}
                            weight={700}
                            size="lg"
                          >
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
            )
          ) : (
            <Text color={secondaryColor} align="center">
              You haven't visited any country in Search Tab.
            </Text>
          )}
        </Tabs.Tab>
      </Tabs>
    </Box>
  );
}

function Country(props) {
  const { inViewport, forwardedRef } = props;

  const { classes } = useStyles();
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

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
            onClick={() => {
              props.setDetails([props.info]);
              props.setActiveTab(1);
            }}
            fullWidth
            style={{ marginTop: 14 }}
          >
            More Details.
          </Button>
        </Card>
      ) : (
        <Skeleton width={"100%"} height="339.32px" />
      )}
    </Box>
  );
}

function debounce(cb, delay = 1000) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export default SearchModal;
