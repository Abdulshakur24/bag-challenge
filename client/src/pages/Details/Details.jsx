import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getFullNameByISO3 } from "./countries";
import {
  DetailsContainer,
  DetailsContents,
  DetailsWrapper,
} from "./DetailStyle";
import { postList } from "../../redux-app/slicers/list";

const Details = () => {
  const { name } = useParams();
  const navigator = useNavigate();

  const [details, setDetails] = useState({
    name: {
      common: "",
      official: "",
      nativeName: {},
    },
    flags: {
      png: "",
      svg: "",
    },
    borders: [],
    population: 0,
    subregion: "",
    capital: [],
    tld: [],
    currencies: {},
    languages: {},
  });

  const user = useSelector((state) => state.user.data);
  const toVisit = useSelector((state) => state.toVisit);
  const visited = useSelector((state) => state.visited);
  const list = useSelector((state) => state.list);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const getCountryByName = () => {
      const country = toVisit.data.filter(
        (object) => object.name.official === name
      );
      if (!country[0]) {
        const visitedCountry = visited.data.filter(
          (object) => object.name.official === name
        );
        return setDetails(visitedCountry[0]);
      }
      setDetails(country[0]);
    };
    getCountryByName();
  });

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
    dispatch(postList({ object: details, token: user.token }));
  };

  const isObjectInList = () => {
    let isFound = false;
    for (let object of list.data) {
      if (details.name.common === object.name.common) {
        isFound = true;
        break;
      }
    }
    return isFound;
  };

  return (
    <DetailsWrapper>
      <DetailsContainer>
        <div className="buttons">
          <button onClick={() => navigator(-1)}>Go Back</button>
          {!isObjectInList() ? (
            <button
              disabled={list.status === "loading"}
              onClick={saveToMyList}
              className="list-btn"
            >
              Add to the list
            </button>
          ) : null}
        </div>
        <DetailsContents>
          <div className="flag">
            <img src={details.flags.svg} alt={details.name.common} />
          </div>
          <div className="details">
            <div className="top-section">
              <h1>{details.name.common}</h1>
              <div className="display">
                <h4>Native Name: </h4>
                <p>{handleNativeName(details.name.nativeName)}</p>
              </div>
              <div className="display">
                <h4>Population: </h4>
                <p>{details.population.toLocaleString()}</p>
              </div>
              <div className="display">
                <h4>Region: </h4> <p> {details.region}</p>
              </div>
              <div className="display">
                <h4>Sub Region: </h4> <p>{details.subregion}</p>
              </div>
              <div className="display">
                <h4>capital:</h4>
                <p>
                  {" "}
                  {details.capital
                    ? details.capital.map((string) => string)
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="mid-section">
              <div className="display">
                <h4>Top Level Domain:</h4>
                <p>{details.tld.map((string) => string)}</p>
              </div>
              <div className="display">
                <h4>Currencies: </h4>
                <p>{handleCurrencies(details.currencies)}</p>
              </div>
              <div className="display">
                <h4>Languages: </h4>
                <p>{concatSentence(handleLanguages(details.languages))}</p>
              </div>
            </div>
            <div className="bottom-section">
              {details.borders ? <h2>Border Countries:</h2> : null}
              <div className="borders">
                {details.borders
                  ? details.borders.map((iso3, index) => (
                      <Border key={index} iso3={iso3} />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </DetailsContents>
      </DetailsContainer>
    </DetailsWrapper>
  );
};

const Border = ({ iso3 }) => {
  const name = getFullNameByISO3(iso3)?.name;
  if (!name) return null;
  return (
    <div className="border">
      <p>{name}</p>
    </div>
  );
};

export default Details;
