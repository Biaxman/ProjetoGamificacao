module.exports = app => {
  const fs = require('fs');
  const sortJsonArray = require('sort-json-array');

  const atribuicaoDB = app.data.atribuicao;
  const controller = {};

  controller.listAtribuicao = (req, res) => {
    var dataRead;
    fs.readFile('./api/data/atribuicao.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      dataRead = JSON.parse(data);
      res.status(200).json(dataRead.atribuicao);
    });
  }

  controller.listAtribuicaoId = (req, res) => {
    var dataRead;

    const {
      atribuicaoId,
    } = req.params;

    fs.readFile('./api/data/atribuicao.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      dataRead = JSON.parse(data);
      var atribuicao = dataRead.atribuicao.find(atribuicao => atribuicao.idUsuario === atribuicaoId);
      res.status(200).json(atribuicao);
    });
  }

  controller.removeAtribuicaoId = (req, res) => {
    var dataRead;

    const {
      atribuicaoId,
    } = req.params;

    fs.readFile('./api/data/atribuicao.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      dataRead = JSON.parse(data);
      var index = dataRead.atribuicao.findIndex(atribuicao => atribuicao.id == atribuicaoId);
      dataRead.atribuicao.splice(index, 1);
      fs.writeFile('./api/data/atribuicao.json', JSON.stringify(dataRead), 'utf-8', () => { console.log('OK') });

      res.status(200).json("Removido com Sucesso.");
    });
  };

  controller.createAtribuicao = (req, res) => {
    var dataRead;

    fs.readFile('./api/data/atribuicao.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      dataRead = JSON.parse(data);
      const index = dataRead.atribuicao.length;
      var lastAtribuicao = dataRead.atribuicao[index - 1];

      var newAtribuicao = ({
        id: parseInt(lastAtribuicao.id) + 1,
        idUsuario: req.body.idUsuario,
        idTarefa: req.body.idTarefa,
        concluida: req.body.concluida,
      });

      dataRead.atribuicao.push(newAtribuicao);

      fs.writeFile('./api/data/atribuicao.json', JSON.stringify(dataRead), 'utf-8', () => { console.log('OK') });

      res.status(201).json(newAtribuicao);
    });
  };

 


  return controller;
}