const router = require('express').Router()
const isAuthenticated = require('../controllers/auth')

const {
  getAllVisits,
  postVisit,
  updateVisit,
  deleteVisit,
} = require('../controllers/visit')

router.get('/all', isAuthenticated, async (req, res) => {
  const { authorization } = req.headers
  res.send(await getAllVisits(authorization))
})

router.post('/post', isAuthenticated, async (req, res) => {
  const { authorization } = req.headers
  const post = req.body
  if (!Object.keys(post).length) return res.status(403).send('Missing payload.')
  res.send(await postVisit(authorization, post))
})

router.patch('/update/:id', isAuthenticated, async (req, res) => {
  const { authorization } = req.headers
  const { id } = req.params
  const post = req.body
  if (!Object.keys(post).length) {
    return res.status(403).send('Missing payload.')
  }
  await updateVisit(authorization, post, id, res)
})

router.delete('/delete/:id', isAuthenticated, async (req, res) => {
  const { authorization } = req.headers
  const { id } = req.params
  await deleteVisit(authorization, id, res)
})

module.exports = router
