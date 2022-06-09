import {
  Anchor,
  Box,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Text,
  Avatar,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext, useEffect, useState, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./RegisterStyle";
import { loadUser } from "../../redux/slicers/user";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import { fetchAllVisits } from "../../redux/slicers/visited";
import { fetchAllList } from "../../redux/slicers/myList";
import { getBase64 } from "../../utils/helpers";
import { PathNameContext } from "../Layout/Layout";
import { fetchCountries } from "../../redux/slicers/toVisit";
import { AppDispatch } from "src/redux/store";
import { restfulAPI } from "src/utils/api";

const controller = new AbortController();

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const [profileUrl, setProfileUrl] = useState("");

  const imageId = useId();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (name) =>
        name.length <= 2 ? "Name must be greater than 2 character(s)." : null,
      email: (email) => (/^\S+@\S+$/.test(email) ? null : "Invalid email"),
      password: (password) =>
        password.length < 6
          ? "Password must contain at least 6 character(s)"
          : null,
      confirmPassword: (value, { password }) =>
        value !== password ? "Passwords did not match" : null,
    },
  });

  const { classes } = useStyles();

  const [isProcessing, setIsProcessing] = useState(false);
  const navigator = useNavigate();

  const handleRegister = async (forms: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<void> => {
    setIsProcessing(true);
    try {
      const { data } = await restfulAPI.post("/user/signup", {
        ...forms,
        profileUrl,
      });
      showNotification({ message: `Welcome ${data.name}!` });
      dispatch(loadUser(data));
      setIsProcessing(false);
      dispatch(fetchCountries("africa"));
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file?.name) {
      getBase64(file)
        .then((result) => {
          setProfileUrl(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Redirect user to 'to-visit' page if token exists in the localStorage.
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
        dispatch(fetchCountries("africa"));
        dispatch(fetchAllVisits(data.token));
        dispatch(fetchAllList(data.token));
        navigator("/home", { replace: true });
      } catch (error) {
        setIsProcessing(false);
        if (error.response) {
          showNotification({
            color: "red",
            message: error.response.data,
            autoClose: 3000,
          });
        }
      }
    };

    if (token) getUser();
    return () => controller.abort();
  }, [dispatch, navigator]);

  const { setPathName } = useContext(PathNameContext);

  useEffect(() => {
    setPathName("Register");
  }, [setPathName]);

  return (
    <Box className={classes.box}>
      <Box className={classes.formWrapper} m="auto">
        <Box className={classes.title} mb={10}>
          <Text className={classes.text}>Register</Text>
          <Avatar src={profileUrl} radius={100} size="lg" />
          <label className={classes.label} htmlFor={imageId}>
            Choose
          </label>
          <input
            id={imageId}
            className={classes.profileFile}
            onChange={handleImageUpload}
            type="file"
            accept="image/*"
          />
        </Box>
        <form onSubmit={form.onSubmit(handleRegister)}>
          <TextInput
            type="text"
            required
            className={classes.input}
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            type="email"
            required
            className={classes.input}
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            className={classes.input}
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            required
            className={classes.input}
            placeholder="Re-Password"
            {...form.getInputProps("confirmPassword")}
          />

          <Group position="right" my="xl">
            <Button
              loading={isProcessing}
              type="submit"
              disabled={!form.values.confirmPassword.length}
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
          Already have an account?
          <Anchor sx={{ marginLeft: "0.25rem" }} component={Link} to="/">
            Login here
          </Anchor>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
