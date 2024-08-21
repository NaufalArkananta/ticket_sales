const express = require('express')

const app = express()

const port = 8000

const cors = require('cors')

app.use(cors())

const userRoute = require(`./routes/user.route`) 

const eventRoute = require('./routes/event.route')

app.use('/user', userRoute)

app.use('/event', eventRoute)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})