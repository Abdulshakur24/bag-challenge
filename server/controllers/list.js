const List = require("../models/list");
const jwt = require("jsonwebtoken");

const extractUserIdFromToken = (authorization) => {
  const token = authorization.split(" ")[1];
  return jwt.verify(token, process.env.JWT_KEY).user._id;
};

const getAllLists = async (authorization) => {
  const userId = extractUserIdFromToken(authorization);
  return await List.find({ user: userId });
};

const postList = async (authorization, post) => {
  const userId = extractUserIdFromToken(authorization);
  const objectExist = await List.findOne({
    user: userId,
    area: post.area,
  });

  if (objectExist) return objectExist;
  return await List.create({ user: userId, ...post });
};
const updateList = async (authorization, { visited }, id, res) => {
  const userId = extractUserIdFromToken(authorization);
  const { acknowledged } = await List.findById(id)
    .where({ user: userId })
    .updateOne({ visited: Boolean(visited) });
  if (acknowledged) {
    return res.send({ message: "Updated.", id, visited: visited });
  }
  return res.status(403).send("Update failed.");
};

const deleteList = async (authorization, id, res) => {
  const userId = extractUserIdFromToken(authorization);
  const { deletedCount } = await List.findById(id).deleteOne({ user: userId });
  if (!deletedCount) return res.status(403).send("No object found to delete.");
  return res.send({ id, message: "Successfully deleted." });
};

module.exports = {
  getAllLists,
  postList,
  updateList,
  deleteList,
};
