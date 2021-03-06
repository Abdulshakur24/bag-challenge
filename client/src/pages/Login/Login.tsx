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
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./LoginStyle";
import { loadUser } from "../../redux/slicers/user";
import { fetchAllVisits } from "../../redux/slicers/visited";
import { fetchAllList } from "../../redux/slicers/myList";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import { AppDispatch } from "src/redux/store";
import { restfulAPI } from "src/utils/api";
import { usePath } from "src/contexts/PathProvider";

const controller = new AbortController();

function Login(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();
  const { setPathName } = usePath();

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

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSignIn = async (forms: { email: string; password: string }) => {
    setIsProcessing(() => true);
    try {
      const { data } = await restfulAPI.post("/user/signin", forms);
      showNotification({ message: `Welcome ${data.name}!` });
      dispatch(loadUser(data));
      setIsProcessing(() => false);
      dispatch(fetchAllVisits(data.token));
      dispatch(fetchAllList(data.token));
      navigator("/home", { replace: true });
    } catch (error) {
      setIsProcessing(false);
      if (error.response) {
        showNotification({
          color: "red",
          message: error.response?.data,
          autoClose: 3000,
        });
      }
    }
  };

  // Redirect user to home page if token exists in the localStorage.
  useEffect(() => {
    const token = localStorage.getItem("token");

    const getUser = async () => {
      setIsProcessing(true);
      try {
        const { data } = await restfulAPI.get("/user/token", {
          signal: controller.signal,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        showNotification({
          message: `Welcome back ${data.name}!`,
          autoClose: 3000,
        });
        dispatch(loadUser(data));
        setIsProcessing(false);
        dispatch(fetchAllVisits(data.token));
        dispatch(fetchAllList(data.token));
        navigator("/home", { replace: true });
      } catch (error) {
        setIsProcessing(false);
        if (error.response) {
          showNotification({
            color: "red",
            message: error.response?.data,
            autoClose: 3000,
          });
        }
      }
    };

    if (token) getUser();

    return () => controller.abort();
  }, [dispatch, navigator]);

  return (
    <Box className={classes.box}>
      <Box className={classes.formWrapper} m="auto">
        <Text className={classes.title}>Login</Text>
        <form onSubmit={form.onSubmit(handleSignIn)}>
          <TextInput
            required
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Password"
            mt="sm"
            {...form.getInputProps("password")}
          />

          <Group position="right" my="xl">
            <Button
              data-testid="button"
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
            gap: "0.75rem",
            alignItems: "center",
          })}
        >
          Don't have an account?
          <Anchor component={Link} to="/register">
            Register here
          </Anchor>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
