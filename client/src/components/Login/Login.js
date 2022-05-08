import {
  Anchor,
  Box,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "../../axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./LoginStyle";
import { loadUser } from "../../redux/slicers/user";
import { fetchAllVisits } from "../../redux/slicers/visited";
import { fetchAllList } from "../../redux/slicers/myList";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import { ToggleContext } from "../../pages/Layout/Layout";
import { fetchCountries } from "../../redux/slicers/toVisit";

const controller = new AbortController();

function Login() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { setPathName } = useContext(ToggleContext);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (email) => (/^\S+@+.\S+$/.test(email) ? null : "Invalid email"),
      password: (password) =>
        password.length < 6
          ? "Password must contain at least 6 character(s)"
          : null,
    },
  });

  useEffect(() => {
    setPathName("Login");
  }, [setPathName]);

  const { classes } = useStyles();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSignIn = (forms) => {
    axios
      .post("/user/signin", forms)
      .then(({ data }) => {
        showNotification({ message: `Welcome ${data.name}!` });
        dispatch(loadUser(data));
        setIsProcessing(false);
        dispatch(fetchCountries("africa"));
        dispatch(fetchAllVisits(data.token));
        dispatch(fetchAllList(data.token));
        navigator("/home", { replace: true });
      })
      .catch(function (error) {
        setIsProcessing(false);
        if (error.response) {
          showNotification({
            color: "red",
            message: error.response?.data,
            autoClose: 3000,
          });
        }
      });
  };

  // Redirect user to 'to-visit' page if token exists in the localStorage.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getUser = async () => {
        setIsProcessing(true);
        axios
          .get("/user/token", {
            signal: controller.signal,
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => {
            showNotification({
              message: `Welcome back ${data.name}!`,
              autoClose: 3000,
            });
            dispatch(loadUser(data));
            setIsProcessing(false);
            dispatch(fetchCountries("africa"));
            dispatch(fetchAllVisits(data.token));
            dispatch(fetchAllList(data.token));
            navigator("/home", { replace: true });
          })
          .catch(function (error) {
            setIsProcessing(false);
            if (error.response) {
              showNotification({
                color: "red",
                message: error.response?.data,
                autoClose: 3000,
              });
            }
          });
      };
      getUser();
    }
    return () => controller.abort();
  }, [dispatch, navigator]);

  return (
    <Box className={classes.box}>
      <Box className={classes.formWrapper} m="auto">
        <Text className={classes.title}>Login</Text>
        <form onSubmit={form.onSubmit(handleSignIn)}>
          <TextInput
            required
            type="email"
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            type="password"
            required
            label="Password"
            placeholder="Password"
            mt="sm"
            {...form.getInputProps("password")}
          />

          <Group position="right" my="xl">
            <Button
              disabled={!form.values.password.length}
              loading={isProcessing}
              type="submit"
            >
              Submit
            </Button>
          </Group>
        </form>
        <Box
          sx={() => ({
            display: "flex",
          })}
        >
          Don't have an account?
          <Anchor
            sx={{ marginLeft: "0.25rem" }}
            component={Link}
            to="/register"
          >
            Register here
          </Anchor>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
