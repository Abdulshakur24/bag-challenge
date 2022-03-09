import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  ToVisitWrapper,
  ToVisitContents,
  ToVisitContainer,
} from "./ToVisitStyle";

import Country from "./Country";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../../../../../utils/helpers";
import { Menu, MenuItem, Skeleton } from "@mui/material";
import { fetchCountries } from "../../../../../../redux-app/slicers/toVisit";
import { ReactComponent as SearchLogo } from "../../../../../../asset/SearchIcon.svg";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const preloaders = [];

for (let i = 1; i <= 15; i++) {
  preloaders.push(<Skeleton key={i} animation="wave" height={400} />);
}

function ToVisit() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const toVisits = useSelector((state) => state.toVisit);
  const visited = useSelector((state) => state.visited);

  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeAndFetchByFilter = (slug) => {
    setAnchorEl(null);
    dispatch(fetchCountries(slug));
  };

  useEffect(() => {
    if (toVisits.status === "error") {
      toastError("Please check your connection.");
      return null;
    }
  }, [toVisits.status]);

  // We want to exclude the object which has already been visited.

  useLayoutEffect(() => {
    const handleRenderVisit = () => {
      let matched = [];
      for (let object of toVisits.data) {
        const determine = !visited.data.find(
          (objectParam) => objectParam.name.common === object.name.common
        );
        if (determine) matched.push(object);
      }
      setSortBy(matched);
    };
    handleRenderVisit();
  }, [toVisits.data, visited.data]);

  const [sortBy, setSortBy] = useState([]);
  const [isNameSorted, setIsNameSorted] = useState(false);

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
    setIsNameSorted(!isNameSorted);
  };

  return (
    <ToVisitWrapper>
      <ToVisitContents>
        <div className="search-container">
          <SearchLogo />
          <input
            type={"text"}
            placeholder="Search..."
            onChange={({ target }) => setQuery(target.value.trim())}
          />
        </div>
        <button className="sort-button" onClick={handleNameSort}>
          Sort by Name
          {isNameSorted ? (
            <ArrowDownward style={{ marginLeft: "0.5rem" }} />
          ) : (
            <ArrowUpward style={{ marginLeft: "0.5rem" }} />
          )}
        </button>

        <button className="filter-button" onClick={handleClick}>
          Filter By Region
        </button>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => closeAndFetchByFilter("africa")}>
            Africa
          </MenuItem>
          <MenuItem onClick={() => closeAndFetchByFilter("america")}>
            America
          </MenuItem>
          <MenuItem onClick={() => closeAndFetchByFilter("asia")}>
            Asia
          </MenuItem>
          <MenuItem onClick={() => closeAndFetchByFilter("europe")}>
            Europe
          </MenuItem>
          <MenuItem onClick={() => closeAndFetchByFilter("oceania")}>
            Oceania
          </MenuItem>
        </Menu>
      </ToVisitContents>
      <ToVisitContainer>
        {toVisits.status === "loading"
          ? preloaders.map((Preloader) => Preloader)
          : sortBy
              .filter((object) => {
                if (!query) return true;
                if (
                  object.name.common
                    .toLocaleLowerCase()
                    .includes(query.toLocaleLowerCase())
                )
                  return true;
                return false;
              })
              .map((props) => (
                <Country
                  key={props.name.common}
                  name={props.name}
                  flags={props.flags}
                  population={props.population}
                  region={props.region}
                  capital={props.capital}
                  info={props}
                />
              ))}
      </ToVisitContainer>
    </ToVisitWrapper>
  );
}

export default ToVisit;
