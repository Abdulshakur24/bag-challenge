import React, { useEffect, useState } from "react";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { BackdropWrapper, HeaderWrapper, ModalWrapper } from "./HeaderStyle";
import { NightlightOutlined, LightMode } from "@mui/icons-material";
import { AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux-app/slicers/user";

function Header() {
  const [toggle, setToggle] = useState({
    theme: localStorage.getItem("theme"),
    menuMobile: false,
    menuDesktop: false,
  });
  const [confirmLogout, setConfirmLogout] = useState(false);
  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-theme", toggle.theme);
  }, [toggle.theme]);

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const isDark = (elementOne, elementTwo) =>
    toggle.theme === "dark" ? elementOne : elementTwo;

  const handleToggleMenu = () => {
    setToggle({ ...toggle, menuMobile: false });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <HeaderWrapper>
      <div className="container">
        <div className="contents">
          <h3>Where in the world?</h3>
          <div className="right-section">
            <Button
              onClick={() => {
                const updated = toggle.theme === "light" ? "dark" : "light";
                setToggle({ ...toggle, theme: updated });
                localStorage.setItem("theme", updated);
              }}
            >
              {isDark(<LightMode />, <NightlightOutlined />)}
              {isDark("Light Mode", "Dark Mode")}
            </Button>
            <Avatar
              src={user?.profileUrl}
              alt={user?.name}
              style={{
                border: "2px solid #212121",
                cursor: "pointer",
              }}
              sx={{ width: 56, height: 56 }}
              onClick={handleClick}
            />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              onClick={() => dispatch(signOut())}
            >
              <MenuItem>Logout.</MenuItem>
            </Menu>
            <h4>Hey, {user?.name}</h4>
          </div>
          <ul
            className={toggle.menuMobile ? "opened" : "closed"}
            onClick={() =>
              setToggle({ ...toggle, menuMobile: !toggle.menuMobile })
            }
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
        {toggle.menuMobile && (
          <Modal
            handleClose={() =>
              setToggle({ ...toggle, menuMobile: !toggle.menuMobile })
            }
          >
            <div className="modal-container">
              <div className="modal-header">
                <Avatar
                  src={user?.profileUrl}
                  alt={user?.name}
                  style={{
                    border: "2px solid #212121",
                  }}
                  sx={{ width: 56, height: 56 }}
                />
                <h4>Hey, {user.name}</h4>
              </div>

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
                    const updated = toggle.theme === "light" ? "dark" : "light";
                    setToggle({ ...toggle, theme: updated });
                    localStorage.setItem("theme", updated);
                  }}
                >
                  {isDark(<LightMode />, <NightlightOutlined />)}
                  {isDark("Light Mode", "Dark Mode")}
                </Button>
                {confirmLogout ? (
                  <div className="confirm-region">
                    <p>Are you sure?</p>
                    <Button
                      onClick={() => {
                        dispatch(signOut());
                      }}
                    >
                      YES
                    </Button>
                    <Button
                      onClick={() => {
                        setConfirmLogout(false);
                      }}
                    >
                      NO
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setConfirmLogout(true)}>
                    Logout.
                  </Button>
                )}
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
