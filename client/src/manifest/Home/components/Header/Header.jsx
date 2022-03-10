import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { BackdropWrapper, HeaderWrapper, ModalWrapper } from "./HeaderStyle";
import { NightlightOutlined, LightMode } from "@mui/icons-material";
import { AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [toggleTheme, setToggleTheme] = useState(localStorage.getItem("theme"));
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-theme", toggleTheme);
  }, [toggleTheme]);

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const isDark = (elementOne, elementTwo) =>
    toggleTheme === "dark" ? elementOne : elementTwo;

  const { pathname } = useLocation();

  const handleToggleMenu = () => {
    setToggleMenu(false);
  };
  return (
    <HeaderWrapper>
      <div className="container">
        <div className="contents">
          <h3>Where in the world?</h3>
          <Button
            onClick={() => {
              const updated = toggleTheme === "light" ? "dark" : "light";
              setToggleTheme(updated);
              localStorage.setItem("theme", updated);
            }}
          >
            {isDark(<LightMode />, <NightlightOutlined />)}
            {isDark("Light Mode", "Dark Mode")}
          </Button>
          <ul
            className={toggleMenu ? "opened" : "closed"}
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {toggleMenu && (
          <Modal handleClose={() => setToggleMenu(!toggleMenu)}>
            <div className="modal-container">
              <div className="modal-content">
                <Link
                  className={`${pathname === "/home/my-list" && "selected"}`}
                  to="my-list"
                  onClick={handleToggleMenu}
                >
                  MY LIST
                </Link>
                <Link
                  className={`${pathname === "/home/visited" && "selected"}`}
                  to="visited"
                  onClick={handleToggleMenu}
                >
                  VISITED
                </Link>
                <Link
                  className={`${pathname === "/home/to-visit" && "selected"}`}
                  to="to-visit"
                  onClick={handleToggleMenu}
                >
                  TO VISIT
                </Link>
              </div>
              <div className="btn-layout">
                <Button
                  onClick={() => {
                    const updated = toggleTheme === "light" ? "dark" : "light";
                    setToggleTheme(updated);
                    localStorage.setItem("theme", updated);
                  }}
                >
                  {isDark(<LightMode />, <NightlightOutlined />)}
                  {isDark("Light Mode", "Dark Mode")}
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </HeaderWrapper>
  );
}

export default Header;

const Modal = ({ children, handleClose }) => {
  return (
    <Backdrop onClick={handleClose}>
      <ModalWrapper
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 1 }}
        animate="visible"
        exit="exit"
      >
        {children}
      </ModalWrapper>
    </Backdrop>
  );
};

const Backdrop = ({ children, onClick }) => {
  return (
    <BackdropWrapper
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </BackdropWrapper>
  );
};
