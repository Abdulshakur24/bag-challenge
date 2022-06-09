import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Layout,
  Home,
  Login,
  Register,
  MyList,
  ToVisit,
  Visited,
  Details,
} from "src/pages";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />}>
          <Route index element={<ToVisit />} />
          <Route path="my-list" element={<MyList />} />
          <Route path="visited" element={<Visited />} />
          <Route path=":area" element={<Details />} />
        </Route>
        <Route path="*" element={<h1>Not found.</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
