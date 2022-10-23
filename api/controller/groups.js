const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

module.exports = app => {
    const Groups = require('../models/groups');
    const User = require('../models/user');

    const controller = {};

    controller.createGroup = async (req, res) => {
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
        adminUser = result.id;

        query = User.find({ user: { $in: admins } });
        result = await query.exec();
        result.forEach(element => 
            adminUsers.push(element.id)
        );

        query = User.find({ user: { $in: comuns }});
        result = await query.exec();
        result.forEach(element => 
            comunUsers.push(element.id)
        );

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

    return controller;
};