import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { MyList, ToVisit, Visited, Details } from "./pages";

function App() {
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
