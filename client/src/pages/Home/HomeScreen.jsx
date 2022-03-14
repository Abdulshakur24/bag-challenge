import React, { useEffect } from "react";
import { HomeWrapper } from "./HomeScreenStyle";
import { useLocation } from "react-router-dom";

import { Sidebar, Main } from "../../components";

function Home() {
  const { pathname } = useLocation();

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [pathname]);

  return (
    <HomeWrapper>
      <Sidebar />
      <Main />
    </HomeWrapper>
  );
}

export default Home;
