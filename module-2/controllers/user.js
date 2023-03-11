const userRouter = require('express').Router()
const uuid = require('uuid')

let users = []

userRouter.get('/', (req, res) => {
  res.send(users)
})

userRouter.get('/:id', (req, res) => {
  const user = users.find((item) => item.id === req.params.id)

  if (user) {
    res.send(user)
  } else {
    res.send('User not Found!')
  }
})

userRouter.post('/', (req, res) => {
  const { username, password, age } = req.body

  const user = {
    id: uuid.v4(),
    login: username,
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
