module.exports = app => {
  const User = require('../models/usuarios');

  const controller = {};

  controller.createUsuario = (req, res) => {
    if (!req.body) {
      res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
      return;
    }

    const user = new User({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      admin: req.body.admin,
      dataInclusao: Date.now(),
    });

    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err=>{
        res.status(500).send({
          message:
          err.message || "Não foi possivel criar o usuário."
        });
      });
  };

  controller.listUsuarios = (req, res) => {
    schema()
  }

  controller.listUsuarioId = (req, res) => {

  }

  controller.removeUsuarioId = (req, res) => {

  };

  controller.updateUsuario = (req, res) => {

  };

  return controller;
}