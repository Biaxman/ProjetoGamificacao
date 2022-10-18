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

  controller.listUsuarios =(async (req, res) => {
    try {
      const users = await User.find();

      return res.send({ users });
 
    } catch (err) {
      return res.status(400).send({error: 'Não foi possível listar os usuários'})
    }
  });

  controller.listUsuarioId = ('/:usuarioId', async (req, res) => {
    try {
      const user = await User.findById(req.params.usuarioId)
      return res.send({ user });
    } catch (err) {
      return res.status(400).send({error: 'Não foi possível listar o usuário'})
    }

  });

  controller.removeUsuarioId = ('/:usuarioId', async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.usuarioId);
      return res.send('OK'); 
      
    } catch (err) {
      return res.status(400).send({error: 'Não foi possível remover o usuário'})
    }

});

  controller.updateUsuario = ('/:usuarioId', async (req, res) => {
    try {
      const {nome, sobrenome} = req.body;

      const newUser = await User.findByIdAndUpdate(req.params.usuarioId, {
        nome,
        sobrenome
      }, {new: true}); 
      
    } catch (err) {
      return res.status(400).send({error: 'Não foi possível alterar o usuário'})
    }

});

  return controller;
}