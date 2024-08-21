const eventModel = require('../models/index').event
const Op = require('sequelize').Op
const path = require('path')
const fs = require('fs')
const { where } = require('sequelize')
const { eventNames } = require('process')
const { error } = require('console')
const upload = require('./uploud-image').single('image')

exports.getAllEvent = async (req, res) => {
    let events = await eventModel.findAll()
    return res.json({
        success: true,
        data: events,
        message: 'All events have been loaded'
    })
}

exports.findEvent = async (req, res) => {
    let keyword = req.params.key

    let events = await eventModel.findAll({
        where: {
            [Op.or]: [
                {eventName: {[Op.substring]: keyword}},
                {eventDate: {[Op.substring]: keyword}},
                {venue: {[Op.substring]: keyword}},
                {price: {[Op.substring]: keyword}}
            ]
        }
    })

    return res.json({
        success: true,
        data: events,
        message:'All events have been loaded'
    })
}

exports.addEvent = (req, res) => {
    upload(req, res, async error => {
        if (error) {
            return res.json({message: error})
            }

        if(!req.file) {
            return res.json({message: 'No image uploaded'})
        }
        
        let newEvent = {
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            venue: req.body.venue,
            price: req.body.price,
            image: req.file.filename
        }

        eventModel.create(newEvent)
        .then(result => {
            return res.json({
                success: true,
                data: result,
                message: 'Event has been added'
        })
    })

    .catch(error => {
        return res.json({
            success: false,
            message: error.message})
        })
    })
}

exports.updateEvent = async (req,res) => {
    uploud(req,res, async error =>{
        if(error){
            return res.json({message:error})
            }
        let eventId = req.params.eventId
        let dataEvent ={
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            venue: req.body.venue,
            price: req.body.price,
        }
        if(req.file){
            const selectedEvent = await eventModel.findOne({
                where: {eventId: eventId}
            })
            const oldImage = selectedEvent.image
            const pathImage = path.join(__dirname, '../image',
                oldImage)
            if (fs.existsSync(pathImage)){
                fs.unlinkSync(pathImage, error => console.log(error))
            }
            dataEvent.image = req.file.filename
        }

        eventModel.update(dataEvent, {where: {eventid: eventId}})
        .then(result => {
            return res.json({
                success: true,
                message:error.message
                })
        })
    })
}

exports.deleteEvent = async (req, res) =>{
    const eventId = req.params.eventId

    const event = await eventModel.findOne({ where: {eventId:eventId}})

    const oldImage = event.image

    const pathImage = path.join(__dirname, '../image', oldImage)

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage, error => console.log(error))
    }

    eventModel.destroy({where : {eventId:eventId}})
    .then(result => {
        return res.json({
            success: true,
            message: 'Event deleted successfully'
        })
    })
    .catch(error => {
        return res.json({
            success: false,
            message: error.message
        })
    })
}
