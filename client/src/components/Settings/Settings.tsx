import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Button,
  Popover,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useStyles } from "./SettingsStyle";
import { signOut } from "src/redux/slicers/user";
import { useClipboard } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { RootState } from "src/redux/store";
import { useToggle } from "src/contexts/ToggleProvider";

function Settings(): JSX.Element {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const { setToggle } = useToggle();
  const { name, email, profileUrl } = useSelector(
    (state: RootState) => state.user.data,
    shallowEqual
  );
  const { classes } = useStyles();
  const clipboard = useClipboard({ timeout: 500 });

  const dispatch = useDispatch();

  const handleRoute = () => {
    setToggle((prev) => {
      return { ...prev, burger: false };
    });
  };

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      setTimeout(() => setOpened(false), 750);
    }
  }, [opened]);

  return (
    <Box className={classes.settingsWrapper}>
      <Box className={classes.header}>
        <Text>Hello, {name} </Text>
        <Popover
          className={classes.popover}
          opened={opened}
          onClose={() => setOpened(false)}
          target={
            <Badge
              onClick={() => {
                setOpened((o) => !o);
                clipboard.copy(email);
              }}
              sx={{
                cursor: "pointer",
              }}
            >
              {email}
            </Badge>
          }
          position="right"
          withArrow
        >
          Copied
        </Popover>
        <Avatar radius={100} src={profileUrl} />
      </Box>
      <Box className={classes.body}>
        <Anchor
          onClick={handleRoute}
          className={classes.anchor}
          component={Link}
          to="/home"
        >
          To Visit
        </Anchor>
        <Anchor
          onClick={handleRoute}
          my={"1rem"}
          className={classes.anchor}
          component={Link}
          to="/home/my-list"
        >
          My List
        </Anchor>
        <Anchor
          onClick={handleRoute}
          className={classes.anchor}
          component={Link}
          to="/home/visited"
        >
          Visited
        </Anchor>
      </Box>

      <Box my={"1rem"}>
        <Button
          sx={() => {
            return { width: "100%" };
          }}
          mb="1rem"
          onClick={() =>
            setToggle((prev) => {
              return {
                modal: false,
                burger: false,
                search: true,
              };
            })
          }
        >
          Global Search
        </Button>
        {confirmLogout ? (
          <Box className={classes.signout}>
            <Text>Are you sure?</Text>
            <Button
              onClick={() => {
                handleRoute();
                dispatch(signOut());
              }}
            >
              Yes
            </Button>
            <Button onClick={() => setConfirmLogout(false)}>No</Button>
          </Box>
        ) : (
          <Button onClick={() => setConfirmLogout(true)}>Sign Out</Button>
        )}
      </Box>
    </Box>
  );
}

export default Settings;
