import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../../redux-app/slicers/user";
import { RegistrationWrapper } from "./RegistrationStyle";
import axios from "../../axios";
import { toastError, toastInfo } from "../../utils/helpers";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { Button, Input } from "./RegistrationStyle";
import { pageMotion } from "../motions";
import { ReactComponent as BagLogo } from "../../asset/BAG-Logo.svg";
import { fetchAllVisits } from "../../redux-app/slicers/visited";

const controller = new AbortController();

function Registration() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [flipCard, setFlipCard] = useState(false);

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    profileUrl: null,
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [signInPasswordVisibility, setSignInPasswordVisibility] =
    useState(false);
  const [signUpPasswordVisibility, setSignUpPasswordVisibility] =
    useState(false);

  const SignInHandleChange = (key) => (event) =>
    setSignInForm({ ...signInForm, [key]: event.target.value });

  const SignUpHandleChange = (key) => (event) =>
    setSignUpForm({ ...signUpForm, [key]: event.target.value });

  const signInHandleSubmitForm = (event) => {
    event.preventDefault();
    setIsFetching(true);
    axios
      .post("/user/signin", signInForm)
      .then(({ data }) => {
        toastInfo(`Welcome ${data.name}!`);
        dispatch(loadUser(data));
        setIsFetching(false);
        dispatch(fetchAllVisits());
        navigator("/home/to-visit", { replace: true });
      })
      .catch(function (error) {
        setIsFetching(false);
        toastError(error.response?.data);
      });
  };

  const signUpHandleSubmitForm = (event) => {
    event.preventDefault();
    setIsFetching(true);
    axios
      .post("/user/signup", signUpForm)
      .then(({ data }) => {
        toastInfo(`Welcome ${data.name}!`);
        dispatch(loadUser(data));
        setIsFetching(false);
        dispatch(fetchAllVisits());
        navigator("/home/to-visit", { replace: true });
      })
      .catch(function (error) {
        setIsFetching(false);
        toastError(error.response?.data);
      });
  };

  // Redirect user to 'to-visit' page if token exist in the localStorage.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getUser = async () => {
        setIsFetching(true);
        axios
          .get("/user/token", {
            signal: controller.signal,
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => {
            toastInfo(`Welcome back ${data.name}!`);
            dispatch(loadUser(data));
            setIsFetching(false);
            dispatch(fetchAllVisits());
            navigator("/home/to-visit", { replace: true });
          })
          .catch(function (error) {
            setIsFetching(false);
            toastError(error.response?.data);
          });
      };
      getUser();
    }
    return () => controller.abort();
  }, [dispatch, navigator]);

  return (
    <RegistrationWrapper
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageMotion}
    >
      <div className="container">
        <div className="header">
          <div className="container">
            <BagLogo />
            <IconButton
              disabled={isFetching || !signInForm.password || !signInForm.email}
              children={<Login fontSize="1rem" />}
            />
          </div>
        </div>
        <div className="main">
          <div className="flip-card">
            <div
              className={`flip-card-inner ${flipCard ? "signUp" : "signIn"} `}
            >
              <div className={`flip-card-front ${flipCard ? "hide" : ""}`}>
                <form onSubmit={signInHandleSubmitForm}>
                  <Input
                    type="email"
                    placeholder="Email"
                    onChange={SignInHandleChange("email")}
                    value={signInForm.email}
                    inputProps={{ minLength: 6 }}
                    required
                  />
                  <Input
                    type={signInPasswordVisibility ? "text" : "password"}
                    value={signInForm.password}
                    onChange={SignInHandleChange("password")}
                    placeholder="Password"
                    inputProps={{ minLength: 6 }}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setSignInPasswordVisibility(
                              !signInPasswordVisibility
                            )
                          }
                        >
                          {signInPasswordVisibility ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <Button
                    type="submit"
                    variant={"outlined"}
                    disabled={
                      isFetching || !signInForm.password || !signInForm.email
                    }
                  >
                    Sign In
                  </Button>
                </form>
                <p>
                  Don't have an account? signup{" "}
                  <em onClick={() => setFlipCard(true)}>here</em>
                </p>
              </div>
              <div className={`flip-card-back ${!flipCard ? "hide" : ""}`}>
                <form onSubmit={signUpHandleSubmitForm}>
                  <Input
                    type="text"
                    placeholder="Name"
                    onChange={SignUpHandleChange("name")}
                    value={signUpForm.name}
                    inputProps={{ minLength: 3 }}
                    required
                  />

                  <Input
                    type="email"
                    placeholder="Email"
                    onChange={SignUpHandleChange("email")}
                    value={signUpForm.email}
                    inputProps={{ minLength: 6 }}
                    required
                  />

                  <Input
                    type={signUpPasswordVisibility ? "text" : "password"}
                    value={signUpForm.password}
                    onChange={SignUpHandleChange("password")}
                    placeholder="Password"
                    inputProps={{ minLength: 6 }}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setSignUpPasswordVisibility(
                              !signUpPasswordVisibility
                            )
                          }
                        >
                          {signUpPasswordVisibility ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <Input
                    type={signUpPasswordVisibility ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-Password"
                    inputProps={{ minLength: 6 }}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setSignUpPasswordVisibility(
                              !signUpPasswordVisibility
                            )
                          }
                        >
                          {signUpPasswordVisibility ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />

                  <Button
                    type="submit"
                    variant="outlined"
                    disabled={
                      isFetching ||
                      !(confirmPassword === signUpForm.password) ||
                      !confirmPassword
                    }
                  >
                    Sign Up
                  </Button>
                </form>

                <p>
                  Already have an account? sign in{" "}
                  <em onClick={() => setFlipCard(false)}>here</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RegistrationWrapper>
  );
}

export default Registration;
