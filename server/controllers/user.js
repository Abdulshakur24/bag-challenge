const User = require("../models/user");
const ProfileImages = require("../models/profileImage");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { setCache, getCache } = require('./helpers')

const confirmPassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

const getUserByEmail = async (email) => {
  return await User.findOne({ email }).lean();
};

const signUp = async ({ name, email, password, profileUrl }, res) => {
  const salts = process.env.SALT;
  const salt = await bcrypt.genSalt(Number(salts));

  const hashed_password = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    hashed_password,
  });

  const profileImages = await ProfileImages.create({
    user: user._id,
    profileUrl,
  });

  const token = jwt.sign({ user }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });

  const result = {
    id: user._id,
    name: user.name,
    email: user.email,
    profileUrl: profileImages?.profileUrl,
    myList: user.myList,
    visited: user.visited,
    token,
  };

  // setCache(email, result)
  return res.send(result);
};

const signIn = async (email, password, res) => {
  // const cached = await getCache(email)
  const user = await getUserByEmail(email);

  if (!user) return res.status(404).send("Account not found.");

  // if (await confirmPassword(password, user.hashed_password))
  //   return res.send(cached)

  const token = jwt.sign({ user }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });

  const profileImages = await ProfileImages.findOne({
    user: user._id,
  });

  if (await confirmPassword(password, user.hashed_password)) {
    const result = {
      id: user._id,
      name: user.name,
      email: user.email,
      profileUrl: profileImages?.profileUrl,
      myList: user.myList,
      visited: user.visited,
      token,
    };

    // setCache(email, result)
    return res.send(result);
  }

  return res.status(404).send("Password Incorrect.");
};

const token = async (authorization, res) => {
  const token = authorization.split(" ")[1];
  const user = await jwt.verify(token, process.env.JWT_KEY).user;

  const profileImages = await ProfileImages.findOne({
    user: user._id,
  });

  const result = {
    id: user._id,
    name: user.name,
    email: user.email,
    profileUrl: profileImages?.profileUrl,
    myList: user.myList,
    visited: user.visited,
    token,
  };
  res.send(result);
};

module.exports = {
  signUp,
  signIn,
  getUserByEmail,
  token,
};
