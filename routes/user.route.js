const express = require('express')

const app = express()

app.use(express.json())

const userController = require('../controllers/user.controllers')

app.get("/", userController.getAllUser)

app.get("/:key",userController.findUser)

app.post("/", userController.addUsers)

app.put("/:id", userController.updateUsers)

app.delete("/:id", userController.deleteUsers)

module.exports = app