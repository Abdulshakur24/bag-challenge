import axios from "axios";

const instance = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

export const fetchCountryByName = (query) => instance.get(`/name/${query}`);
