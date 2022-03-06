const List = require('../models/list')
const jwt = require('jsonwebtoken')

const extractUserIdFromToken = (authorization) => {
  const token = authorization.split(' ')[1]
  return jwt.verify(token, process.env.JWT_KEY).user._id
}

const getAllLists = async (authorization) => {
  const userId = extractUserIdFromToken(authorization)
  return await List.find({ user: userId })
}

const postList = async (authorization, post) => {
  const userId = extractUserIdFromToken(authorization)
  const objectExist = await List.findOne({
    user: userId,
    'name.common': post.name.common,
  })
  if (objectExist) return objectExist
  const response = await List.create({ user: userId, ...post })
  return response
}
const updateList = async (authorization, { myList }, id, res) => {
  const userId = extractUserIdFromToken(authorization)
  const { acknowledged } = await List.findById(id)
    .where({ user: userId })
    .updateOne({ myList })
  if (acknowledged) {
    return res.send(await List.findOne({ _id: id, user: userId }))
  }
  return res.status(403).send('Update failed.')
}

const deleteList = async (authorization, id, res) => {
  const userId = extractUserIdFromToken(authorization)
  const { deletedCount } = await List.findById(id).deleteOne({ user: userId })
  if (!deletedCount) return res.status(403).send('No object found to delete.')
  return res.status(200).send('Successfully deleted.')
}

module.exports = {
  getAllLists,
  postList,
  updateList,
  deleteList,
}
