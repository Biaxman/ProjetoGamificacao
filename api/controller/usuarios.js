module.exports = app => {
  const fs = require('fs');
  const sortJsonArray = require('sort-json-array');

  const controller = {};

  controller.listUsuarios = (req, res) => {
    var dataRead;
    fs.readFile('./api/data/usuarios.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      dataRead = JSON.parse(data);
      res.status(200).json(dataRead.usuarios);
    });
  }

  controller.listUsuarioId = (req, res) => {
    var dataRead;

    const {
      usuarioId,
    } = req.params;

    fs.readFile('./api/data/usuarios.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      dataRead = JSON.parse(data);
      var usuario = dataRead.usuarios.find(usuario => usuario.id == usuarioId);
      res.status(200).json(usuario);
    });
  }

  controller.removeUsuarioId = (req, res) => {
    var dataRead;

    const {
      usuarioId,
    } = req.params;

    fs.readFile('./api/data/usuarios.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      dataRead = JSON.parse(data);
      var index = dataRead.usuarios.findIndex(usuario => usuario.id === usuarioId);
      dataRead.usuarios.splice(index, 1);
      fs.writeFile('./api/data/usuarios.json', JSON.stringify(dataRead), 'utf-8', () => { console.log('OK') });

      res.status(200).json("Removido com Sucesso.");
    });
  };

  controller.createUsuario = (req, res) => {
    var dataRead;

    fs.readFile('./api/data/usuarios.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      dataRead = JSON.parse(data);
      const index = dataRead.usuarios.length;
      var lastUsuario = dataRead.usuarios[index - 1];

      var newUsuario = ({
        id: parseInt(lastUsuario.id) + 1,
        nome: req.body.nome,
        tipo: req.body.tipo,
        ativo: true,
      });

      dataRead.usuarios.push(newUsuario);

      fs.writeFile('./api/data/usuarios.json', JSON.stringify(dataRead), 'utf-8', () => { console.log('OK') });

      res.status(201).json(newUsuario);
    });
  };

  controller.updateUsuario = (req, res) => {
    var dataRead;

    fs.readFile('./api/data/usuarios.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      dataRead = JSON.parse(data);
      var index = dataRead.usuarios.findIndex(usuario => usuario.id == req.body.id);
      var changedUsuario = dataRead.usuarios.find(usuario => usuario.id == req.body.id);

      changedUsuario = ({
        id: req.body.id,
        nome: req.body.nome,
        tipo: req.body.tipo,
        ativo: req.body.ativo,
      });

      dataRead.usuarios.splice(index, 1);
      dataRead.usuarios.push(changedUsuario);

      var usuarios = dataRead.usuarios;
      usuarios = sortJsonArray(usuarios, 'id')

      dataRead.usuarios = usuarios;

      fs.writeFile('./api/data/usuarios.json', JSON.stringify(dataRead), 'utf-8', () => { console.log('OK') });

      res.status(201).json(changedUsuario);
    });
  };

  return controller;
}