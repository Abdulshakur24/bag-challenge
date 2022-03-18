const router = require('express').Router()
const Joi = require('joi')
const isAuthenticated = require('../controllers/auth')

const { signUp, getUserByEmail, signIn, token } = require('../controllers/user')

router.post('/signup', async (req, res) => {
  const { name, email, password, profileUrl } = req.body

  const checkValidation = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().min(6).max(30).required().email(),
    password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  })

  const { error, value } = checkValidation.validate({
    name,
    email,
    password,
  })

  if (error) return res.status(403).send(error.message)
  if (await getUserByEmail(email)) {
    return res.status(403).send('Email already taken!')
  }
  await signUp({ ...value, profileUrl }, res)
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  await signIn(email, password, res)
})

router.get('/token', isAuthenticated, async (req, res) => {
  const { authorization } = req.headers
  await token(authorization, res)
})

module.exports = router
