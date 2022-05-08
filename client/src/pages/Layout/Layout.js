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

export const ToggleContext = createContext({
  burger: false,
});

function Layout() {
  const { classes, theme } = useStyles();
  const scroll = useScroll();
  const [toggle, setToggle] = useState({
    burger: false,
  });

  const [pathName, setPathName] = useState("");

  const [navClassList, setNavClassList] = useState([]);
  const { data: user } = useSelector((state) => state.user);

  useEffect(() => {
    const _classList = [];
    if (scroll.y > 0 && scroll.y - scroll.lastY > 0) {
      _classList.push("hidden");
    }
    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);

  const currentPrimaryColor = theme.colors[theme.primaryColor][5];

  const [opened, setOpened] = useState(false);
  const navigator = useNavigate();

  return (
    <Container className={classes.container}>
      <ToggleContext.Provider
        value={{ toggle, setToggle, pathName, setPathName }}
      >
        <Box className={`${navClassList.join(" ")} ${classes.box}`}>
          <Logo
            onClick={() => navigator("/home")}
            fill={currentPrimaryColor}
            style={{ cursor: "pointer" }}
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
      </ToggleContext.Provider>
    </Container>
  );
}

export default Layout;
