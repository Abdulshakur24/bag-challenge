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
import axios from "../../axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./RegisterStyle";
import { loadUser } from "../../redux/slicers/user";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import { fetchAllVisits } from "../../redux/slicers/visited";
import { fetchAllList } from "../../redux/slicers/myList";
import { getBase64 } from "../../utils/helpers";
import { ToggleContext } from "../../pages/Layout/Layout";
import { fetchCountries } from "../../redux/slicers/toVisit";

const controller = new AbortController();
function Register() {
  const dispatch = useDispatch();
  const [profileUrl, setProfileUrl] = useState("");

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileUrl: "",
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
  const handleRegister = (forms) => {
    setIsProcessing(true);
    axios
      .post("/user/signup", { ...forms, profileUrl })
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
                message: error.response.data,
                autoClose: 3000,
              });
            }
          });
      };
      getUser();
    }
    return () => controller.abort();
  }, [dispatch, navigator]);

  const { setPathName } = useContext(ToggleContext);

  useEffect(() => {
    setPathName("Register");
  }, [setPathName]);

  return (
    <Box className={classes.box}>
      <Box className={classes.formWrapper} m="auto">
        <Box className={classes.title} mb={10} size="xl">
          <Text className={classes.text}>Register</Text>
          <Avatar src={profileUrl} radius={"100%"} size="lg" />
          <label className={classes.label} htmlFor="image">
            Choose
          </label>
          <input
            id="image"
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
