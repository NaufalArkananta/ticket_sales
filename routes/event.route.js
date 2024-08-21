const express = require('express')

const app = express()

app.use(express.json())

const evenController = require('../controllers/event.controller')

app.get("/",evenController.getAllEvent)

app.post("/", evenController.addEvent)

app.put("/:id", evenController.updateEvent)

app.delete("/:id",evenController.deleteEvent)

app.use(express.static(__dirname))

module.exports = app