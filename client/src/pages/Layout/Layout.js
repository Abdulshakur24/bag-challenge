import {
  Avatar,
  Box,
  Burger,
  Container,
  Drawer,
  Modal,
  Text,
} from "@mantine/core";
import React, { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/BAG-Logo.svg";
import Preferences from "../../components/Preferences/Preferences";
import { useStyles } from "./LayoutStyle";
import useScroll from "../../hooks/useScroll";
import { useSelector } from "react-redux";
import { Settings } from "../../components";

const initialToggle = {
  burger: false,
  search: false,
};

export const ToggleContext = createContext(initialToggle);

export const PathNameContext = createContext("");

function Layout() {
  const { classes, theme } = useStyles();
  const scroll = useScroll();
  const [toggle, setToggle] = useState(initialToggle);

  const [pathName, setPathName] = useState("");

  const [navClassList, setNavClassList] = useState([]);
  const { data: user } = useSelector((state) => state.user);

  useEffect(() => {
    const _classList = [];
    if (scroll.currentY > 0 && scroll.currentY - scroll.lastY > 0) {
      _classList.push("hidden");
    }
    setNavClassList(_classList);
  }, [scroll.currentY, scroll.lastY]);

  const currentPrimaryColor = theme.colors[theme.primaryColor][5];

  const [opened, setOpened] = useState(false);
  const navigator = useNavigate();

  return (
    <Container className={classes.container}>
      <ToggleContext.Provider value={{ toggle, setToggle }}>
        <PathNameContext.Provider value={{ pathName, setPathName }}>
          <Box className={`${navClassList.join(" ")} ${classes.box}`}>
            <Logo
              onClick={user ? () => navigator("/home") : () => {}}
              fill={currentPrimaryColor}
              style={{ cursor: user ? "pointer" : "unset" }}
            />
            <Burger
              onClick={() => setToggle({ ...toggle, burger: !toggle.burger })}
              size={"md"}
              className={classes.burger}
              opened={toggle.burger}
              color={currentPrimaryColor}
            />

            <Box className={classes.desktopInfo}>
              {user && (
                <>
                  <Text>Hey, {user.name}</Text>
                  <Avatar
                    className={classes.avatar}
                    radius={"100%"}
                    onClick={() => setOpened(true)}
                    src={user.profileUrl}
                    alt={user.name}
                  />
                </>
              )}
              {!user && (
                <Avatar
                  className={classes.avatar}
                  radius={"100%"}
                  onClick={() => setOpened(true)}
                  src={null}
                  alt={"Guest"}
                />
              )}

              <Modal
                className={classes.modal}
                opened={opened}
                onClose={() => setOpened(false)}
                transition="fade"
                transitionDuration={400}
                title={
                  <Text size="xl" weight={700} color={currentPrimaryColor}>
                    {pathName}
                  </Text>
                }
                overflow="outside"
              >
                {user && <Settings />}
                <Preferences />
              </Modal>
            </Box>

            <Drawer
              opened={toggle.burger}
              onClose={() => setToggle({ ...toggle, burger: false })}
              title={
                <Text size="xl" weight={700} color={currentPrimaryColor}>
                  {pathName}
                </Text>
              }
              position="right"
              padding={"lg"}
              className={classes.drawer}
            >
              {(user && <Settings />) || null}
              <Preferences />
            </Drawer>
          </Box>
          <Box className={classes.outlet}>
            <Outlet />
          </Box>
        </PathNameContext.Provider>
      </ToggleContext.Provider>
    </Container>
  );
}

export default Layout;
