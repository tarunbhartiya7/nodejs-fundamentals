const userRouter = require('express').Router()
const uuid = require('uuid')
const Joi = require('joi')
const { validateSchema } = require('../utils')

let users = []

const getAutoSuggestUsers = (loginSubstring, limit) => {
  return users
    .filter((item) => item.login.includes(loginSubstring))
    .filter((item, i) => i <= limit - 1)
    .sort((a, b) => (a.login < b.login ? -1 : 1))
}

const schema = Joi.object({
  login: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(new RegExp('^[a-zA-Z]+[0-9]+$')),

  age: Joi.number().min(4).max(130).required(),
})

userRouter.get('/', (req, res) => {
  const limit = req.query.limit || 10
  const substr = req.query.substr ?? ''

  const result = getAutoSuggestUsers(substr, limit)
  res.send(result)
})

userRouter.get('/:id', (req, res) => {
  const user = users.find((item) => item.id === req.params.id)

  if (user) {
    res.send(user)
  } else {
    res.send('User not Found!')
  }
})

userRouter.post('/', validateSchema(schema), (req, res) => {
  const { login, password, age } = req.body

  const user = {
    id: uuid.v4(),
    login,
    password,
    age,
    isDeleted: false,
  }

  users.push(user)

  res.send(user)
})

userRouter.put('/:id', (req, res) => {
  const { age, password } = req.body
  let found

  users = users.map((item) => {
    if (item.id === req.params.id) {
      item.age = age ?? item.age
      item.password = password ?? item.password
      found = item
    }
    return item
  })

  if (!found) {
    res.send('User not Found!')
  }

  res.send(found)
})

userRouter.delete('/:id', (req, res) => {
  let isFound = false

  users = users.map((item) => {
    if (item.id === req.params.id) {
      item.isDeleted = true
      isFound = true
    }
    return item
  })

  if (!isFound) {
    res.send('User not Found!')
  }

  res.send('User Deleted!')
})

module.exports = userRouter
