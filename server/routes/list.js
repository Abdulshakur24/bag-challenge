const router = require('express').Router()
const isAuthenticated = require('../controllers/auth')

const {
  getAllLists,
  postList,
  updateList,
  deleteList,
} = require('../controllers/list')

router.get('/all', isAuthenticated, async (req, res) => {
  const { authorization } = req.headers
  res.send(await getAllLists(authorization))
})

router.post('/post', isAuthenticated, async (req, res) => {
  const { authorization } = req.headers
  const post = req.body
  if (!Object.keys(post).length) return res.status(403).send('Missing payload.')
  res.send(await postList(authorization, post))
})

router.patch('/update/:id', isAuthenticated, async (req, res) => {
  const { authorization } = req.headers
  const { id } = req.params
  const post = req.body
  if (!Object.keys(post).length) {
    return res.status(403).send('Missing payload.')
  }
  await updateList(authorization, post, id, res)
})

router.delete('/delete/:id', isAuthenticated, async (req, res) => {
  const { authorization } = req.headers
  const { id } = req.params
  await deleteList(authorization, id, res)
})

module.exports = router
