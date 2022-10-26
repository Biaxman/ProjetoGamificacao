const jwtValidate = require('../../config/jwt');
require("dotenv-safe").config();

module.exports = app => {
    const Tasks = require('../models/tasks');

    const controller = {};

    controller.createTask = async (req, res) => {

        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
            return;
        }

        var query = User.findOne({ user: req.body.userId });
        var result = await query.exec();
        adminUser = result._id;

        if(adminUser === undefined)
        {
            res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
            return;
        }

        const group = new Groups({
            user: adminUser,
            nomeGrupo: req.body.nomeGrupo,
            adminUsers: adminUsers,
            comunUsers: comunUsers,
            ativo: req.body.ativo,

        });

        group
            .save(group)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Não foi possivel criar o Grupo."
                });
            });
    }

    controller.updateGroup = async (req, res) => {

        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
            return;
        }

        const admins = req.body.adminUsers;
        const comuns = req.body.comunUsers;
        var adminUsers = [];
        var comunUsers = [];
        var adminUser;

        var query = User.findOne({ user: req.body.user });
        var result = await query.exec();
        adminUser = result._id;

        query = User.find({ user: { $in: admins } });
        result = await query.exec();
        result.forEach(element =>
            adminUsers.push(element._id)
        );

        query = User.find({ user: { $in: comuns } });
        result = await query.exec();
        result.forEach(element =>
            comunUsers.push(element._id)
        );

        filter = { 'id': req.body.id };
        set = {
            '$set':
            {
                'nomeGrupo': req.body.nomeGrupo,
                'adminUsers': adminUsers,
                'comunUsers': comunUsers,
            }
        };

        Groups.findOneAndUpdate(filter, set);
    }

    controller.getGroup = async (req, res) => {

    }

    controller.getGroupById = async (req, res) => {

    }

    controller.deleteGroup = async (req, res) => {

    }

    return controller;
};