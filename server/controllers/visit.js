const jwt = require("jsonwebtoken");
const Visit = require("../models/visit");

const extractUserIdFromToken = (authorization) => {
  const token = authorization.split(" ")[1];
  return jwt.verify(token, process.env.JWT_KEY).user._id;
};

const getAllVisits = async (authorization) => {
  const userId = extractUserIdFromToken(authorization);
  const allVisits = await Visit.find({ user: userId });
  return allVisits;
};

const postVisit = async (authorization, post) => {
  const userId = extractUserIdFromToken(authorization);
  // check if country's name from our db are the same
  //as payload's name. if so, return the existing object.
  const objectExist = await Visit.findOne({
    user: userId,
    area: post.area,
  });
  if (objectExist) return objectExist;

  const response = await Visit.create({ user: userId, ...post });
  return response;
};

const updateVisit = async (authorization, { visited }, id, res) => {
  const userId = extractUserIdFromToken(authorization);
  const { acknowledged } = await Visit.findById(id)
    .where({ user: userId })
    .updateOne({ visited });
  if (acknowledged) {
    return res.send(await Visit.findOne({ _id: id, user: userId }));
  }
  return res.status(403).send("Update failed.");
};

const deleteVisit = async (authorization, id, res) => {
  const userId = extractUserIdFromToken(authorization);
  const { deletedCount } = await Visit.findById(id).deleteOne({ user: userId });
  if (!deletedCount)
    return res.status(403).send("No object found to be deleted.");
  return res.status(200).send("Successfully deleted.");
};

module.exports = {
  getAllVisits,
  postVisit,
  updateVisit,
  deleteVisit,
};
