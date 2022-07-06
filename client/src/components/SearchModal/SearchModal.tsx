import {
  Box,
  Button,
  Card,
  Group,
  Image,
  Input,
  Modal,
  Tabs,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  debounce,
  trimEllip,
  handleNativeName,
  handleCurrencies,
  handleLanguages,
  concatSentence,
} from "src/utils/helpers";
import {
  BorderProps,
  CountryProps,
  SearchGloballyProps,
} from "src/types/defaults";
import { showNotification } from "@mantine/notifications";
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { getFullNameByISO3 } from "src/pages/Details/countriesByISO3";
import { useStyles } from "./SearchModalStyle";
import { thirdPartyAPI } from "src/utils/api";
import { useToggle } from "src/contexts/ToggleProvider";

const MemoizedCountry = memo(Country);

function SearchModal(): JSX.Element {
  const [query, setQuery] = useState("");
  const { classes } = useStyles();
  const { setToggle, toggle } = useToggle();

  const debounceQuery = debounce((text: string) => {
    setQuery(() => text);
  });

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
          placeholder="Search Any Country."
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
            debounceQuery(target.value);
          }}
        />
      }
      overflow="outside"
      className={classes.modalWrapper}
    >
      <Box>
        <SearchGlobally query={query} />
      </Box>
    </Modal>
  );
}

function SearchGlobally({ query }: SearchGloballyProps): JSX.Element {
  const { classes } = useStyles();
  const [countries, setCountries] = useState([]);
  const [details, setDetails] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const { data } = await thirdPartyAPI(`name/${query}`, {
          method: "GET",
        });
        setCountries(data);
      } catch ({ response }) {
        if (response) {
          if (response.status === 404) {
            return showNotification({
              color: "red",
              message: `'${query}' is not a country.`,
              autoClose: 1500,
            });
          }
          if (response.status === 0) {
            showNotification({
              color: "red",
              message: `Please check your connection.`,
              autoClose: 1500,
            });
            return;
          }
          showNotification({
            color: "red",
            message: response.data.message,
            autoClose: 1500,
          });
        }
      }
    };
    if (query) {
      handleFetch();
    }
  }, [query]);

  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
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
        <Box className={classes.countries}>
          {countries.length ? (
            countries.map((props) => (
              <MemoizedCountry
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
                <Box>
                  <Box>
                    <Box>
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
          )
        ) : (
          <Text color={secondaryColor} align="center">
            You haven't visited any country in Search Tab.
          </Text>
        )}
      </Tabs.Tab>
    </Tabs>
  );
}

function Country({
  flags,
  name,
  population,
  region,
  capital,
  info,
  setDetails,
  setActiveTab,
}: CountryProps): JSX.Element {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Box>
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
            onClick={() => {
              setDetails([info]);
              setActiveTab(1);
            }}
            fullWidth
            style={{ marginTop: 14 }}
          >
            More Details.
          </Button>
        </Card>
      }
    </Box>
  );
}

function Border({ iso3 }: BorderProps): JSX.Element {
  const { classes } = useStyles();

  const name = getFullNameByISO3(iso3).name;
  if (!name) return null;

  return (
    <Box className={classes.border}>
      <Text>{name}</Text>
    </Box>
  );
}

export default SearchModal;
