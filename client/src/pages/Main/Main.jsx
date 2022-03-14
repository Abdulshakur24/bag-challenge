import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, MyList, ToVisit, Visited, Details } from "../../components";
import { MainWrapper } from "./MainStyle";

function Main() {
  return (
    <MainWrapper>
      <Header />
      <div className="routes-container">
        <Routes>
          <Route path="to-visit" element={<ToVisit />} />
          <Route index path="to-visit/:name" element={<Details />} />
          <Route path="my-list" element={<MyList />} />
          <Route path="my-list/:name" element={<Details />} />
          <Route path="visited" element={<Visited />} />
          <Route path="visited/:name" element={<Details />} />
          <Route path="*" element={<h1>Not found.</h1>} />
        </Routes>
      </div>
    </MainWrapper>
  );
}

export default Main;
