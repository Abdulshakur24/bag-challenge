import { Box, Button, Input, Menu, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Country } from "../../components";
import { fetchCountries } from "../../redux/slicers/toVisit";
import { ToggleContext } from "../Layout/Layout";
import { useStyles } from "./ToVisitStyle";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import handleViewport from "react-in-viewport";

const ViewportCountry = handleViewport(Country, { threshold: 0 });

function ToVisit() {
  const [region, setRegion] = useState("Africa");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState([]);
  const [isNameSorted, setIsNameSorted] = useState(false);
  const { setPathName } = useContext(ToggleContext);
  const { classes } = useStyles();

  const { status } = useSelector((state) => state.toVisit);
  const { data: toVisits } = useSelector((state) => state.toVisit);
  const { data: visited } = useSelector((state) => state.visited);

  useEffect(() => {
    setPathName("To Visit");
  }, [setPathName]);

  useLayoutEffect(() => {
    const handleRenderVisit = () => {
      let matched = [];
      for (let object of toVisits) {
        const determine = !visited.find(
          (objectParam) => objectParam.area === object.area
        );
        if (determine) matched.push(object);
      }
      setSortBy(matched);
    };
    handleRenderVisit();
  }, [toVisits, visited]);

  const dispatch = useDispatch();

  const [opened, handlers] = useDisclosure(false);

  const fetchCountriesByRegion = (slug) => {
    setRegion(slug);
    dispatch(fetchCountries(slug));
  };

  const alphabeticalSorter = (array = []) => {
    return isNameSorted
      ? array.sort((a, b) =>
          a.name.common.localeCompare(b.name.common, "en", {
            sensitivity: "base",
          })
        )
      : array.sort((a, b) =>
          b.name.common.localeCompare(a.name.common, "en", {
            sensitivity: "base",
          })
        );
  };

  const handleNameSort = () => {
    setSortBy(alphabeticalSorter(sortBy));
    setIsNameSorted((prev) => !prev);
  };

  const searchFilter = () => {
    return sortBy.filter((object) => {
      if (!query) return true;
      if (
        object.name.common
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
      )
        return true;
      return false;
    });
  };

  return (
    <>
      <Box className={classes.header}>
        <Input
          onChange={(e) => setQuery(e.target.value)}
          className={classes.input}
          icon={<BiSearchAlt2 size={20} />}
          placeholder="Search Country."
          rightSectionWidth={70}
          styles={{ rightSection: { pointerEvents: "none" } }}
        />
        <Button
          disabled={searchFilter().length <= 1}
          className={classes.sortButton}
          onClick={handleNameSort}
        >
          Sort by Name
          {isNameSorted ? (
            <AiOutlineArrowDown style={{ marginLeft: "0.5rem" }} />
          ) : (
            <AiOutlineArrowUp style={{ marginLeft: "0.5rem" }} />
          )}
        </Button>
        <Menu
          className={classes.menu}
          control={<Button fullWidth>Filter</Button>}
          opened={opened}
          onOpen={handlers.open}
          onClose={handlers.close}
        >
          <Menu.Item onClick={() => fetchCountriesByRegion("Africa")}>
            Africa
          </Menu.Item>
          <Menu.Item onClick={() => fetchCountriesByRegion("America")}>
            America
          </Menu.Item>
          <Menu.Item onClick={() => fetchCountriesByRegion("Asia")}>
            Asia
          </Menu.Item>
          <Menu.Item onClick={() => fetchCountriesByRegion("Europe")}>
            Europe
          </Menu.Item>
          <Menu.Item onClick={() => fetchCountriesByRegion("Oceania")}>
            Oceania
          </Menu.Item>
        </Menu>
      </Box>

      <Box className={classes.body}>
        {searchFilter().length !== 0 ? (
          searchFilter().map((props) => (
            <Skeleton key={props.area} visible={status === "loading"}>
              <ViewportCountry
                area={props.area}
                name={props.name}
                flags={props.flags}
                population={props.population}
                region={props.region}
                capital={props.capital}
                info={props}
                hasVisited={false}
              />
            </Skeleton>
          ))
        ) : (
          <>
            {query.length || searchFilter().length ? (
              <SearchNotFound query={query} region={region} />
            ) : (
              <YouHaveVisitedAllCountryInThisRegion region={region} />
            )}
          </>
        )}
        {(window.scrollY > 1200 && (
          <Box
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={classes.scrollToTop}
          >
            <AiOutlineArrowUp className={classes.icon} size={"100%"} />
          </Box>
        )) ||
          null}
      </Box>
    </>
  );
}

const SearchNotFound = ({ query, region }) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.SearchNotFoundWrapper}>
      <Text>
        '{query}' is not found in region of {region}.
      </Text>
    </Box>
  );
};

const YouHaveVisitedAllCountryInThisRegion = ({ region }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.YouHaveVisitedAllCountryInThisRegionWrapper}>
      <Text>You have visited all countries in this {region} region.</Text>
    </Box>
  );
};

export default ToVisit;
