import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { HeaderWrapper } from "./HeaderStyle";
import { NightlightOutlined, LightMode } from "@mui/icons-material";
function Header() {
  const [toggle, setToggle] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    document.getElementsByTagName("html")[0].setAttribute("data-theme", toggle);
  }, [toggle]);

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const isDark = (elementOne, elementTwo) =>
    toggle === "dark" ? elementOne : elementTwo;

  return (
    <HeaderWrapper>
      <div className="container">
        <div className="contents">
          <h3>Where in the world?</h3>
          <Button
            onClick={() => {
              const updated = toggle === "light" ? "dark" : "light";
              setToggle(updated);
              localStorage.setItem("theme", updated);
            }}
          >
            {isDark(<LightMode />, <NightlightOutlined />)}
            {isDark("Light Mode", "Dark Mode")}
          </Button>
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
