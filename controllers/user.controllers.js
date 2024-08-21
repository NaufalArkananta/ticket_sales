const userModel = require('../models/index').user
const { request } = require('express')
const md5 = require('md5')
const { where } = require('sequelize')
const Op = require('sequelize').Op

exports.getAllUser = async (req,res) => {
    let users = await userModel.findAll()
    return res.json({
        success: true,
        data: users,
        message: 'All users have been loaded'
    })
}

exports.findUser = async (req, res) => {
   let keyword = req.params.key

    let users = await userModel.findAll({
        where: {
            [Op.or]: [
                { userId: { [Op.substring]: keyword }},
                { firstname: { [Op.substring]: keyword }},
                { lastname: { [Op.substring]: keyword }},
                { email: { [Op.substring]: keyword }},
                { role: { [Op.substring]: keyword }}
            ]
        }
    })

    return res.json({
        success: true,
        data: users,
        message: 'All users have been loaded'
    })
}

exports.addUsers = (req, res) => {
    let newUsers = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role
    }

    userModel.create(newUsers)
    .then((result) => {
        return res.json({
            success: true,
            data: result,
            message: 'User has been added'
        })
    })

    .catch(error =>{
        return res.json({
            success: false,
            message: error.message
            })
    })
}

exports.updateUsers = (req, res) => {
    let dataUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role
    }
    if (req.body.password) {
        dataUser.password = md5(req.body.password)
    }

    let userId = req.params.id

    userModel.update(dataUser, {where: {userId : userId} })
    .then(result => {
        return res.json({
            success: true,
            message: 'Data user has ben updated'
        })
    })

    .catch(error =>{
        return res.json({
            success: false,
            message: error.message
        })
    })
}

exports.deleteUsers = (req, res) => {
    let userId = req.params.id

    userModel.destroy({where: {userId: userId}})
    .then(result => {
        return res.json({
            success: true,
            message: 'User has been deleted'
            })
    })

    .catch(error =>{
        return res.json({
            success: false,
            message: error.message
            })
    })
}

exports.resetPassword = (req, res) => {
    let dataUser = {
        email: req.body.email,
    }

    if (req.body.password) {
        dataUser.password = md5(req.body.password);
    }
    
    let userId = req.params.id;

    userModel.update(dataUser, { where: { userId: userId } })
    .then(result => {
        return res.json({
            success: true,
            message: 'Password has been updated'
        });
    })
    .catch(error => {
        return res.json({
            success: false,
            message: error.message
        });
    });
};
