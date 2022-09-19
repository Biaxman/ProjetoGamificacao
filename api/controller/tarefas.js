module.exports = app => {
  const fs = require('fs');
  const sortJsonArray = require('sort-json-array');

  const tarefasDB = app.data.tarefas;
  const controller = {};

  controller.listTarefas = (req, res) => {
    var dataRead;
    fs.readFile('./api/data/tarefas.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      dataRead = JSON.parse(data);
      res.status(200).json(dataRead.tarefas);
    });
  }

  controller.listTarefaId = (req, res) => {
    var dataRead;

    const {
      tarefaId,
    } = req.params;

    fs.readFile('./api/data/tarefas.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      dataRead = JSON.parse(data);
      var tarefa = dataRead.tarefas.find(tarefa => tarefa.id === tarefaId);
      res.status(200).json(tarefa);
    });
  }

  controller.removeTarefaId = (req, res) => {
    var dataRead;

    const {
      tarefaId,
    } = req.params;

    fs.readFile('./api/data/tarefas.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      dataRead = JSON.parse(data);
      var index = dataRead.tarefas.findIndex(tarefa => tarefa.id === tarefaId);
      dataRead.tarefas.splice(index, 1);
      fs.writeFile('./api/data/tarefas.json', JSON.stringify(dataRead), 'utf-8', () => { console.log('OK') });

      res.status(200).json("Removido com Sucesso.");
    });
  };

  controller.createTarefa = (req, res) => {
    var dataRead;

    fs.readFile('./api/data/tarefas.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      dataRead = JSON.parse(data);
      const index = dataRead.tarefas.length;
      var lastTarefa = dataRead.tarefas[index - 1];

      var newTarefa = ({
        id: parseInt(lastTarefa.id) + 1,
        descricao: req.body.descricao,
        pontos: req.body.pontos,
        ativa: true,
      });

      dataRead.tarefas.push(newTarefa);

      fs.writeFile('./api/data/tarefas.json', JSON.stringify(dataRead), 'utf-8', () => { console.log('OK') });

      res.status(201).json(newTarefa);
    });
  };

  controller.updateTarefa = (req, res) => {
    var dataRead;

    fs.readFile('./api/data/tarefas.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      dataRead = JSON.parse(data);
      var index = dataRead.tarefas.findIndex(tarefa => tarefa.id == req.body.id);
      var changedTarefa = dataRead.tarefas.find(tarefa => tarefa.id == req.body.id);

      changedTarefa = ({
        id: req.body.id,
        descricao: req.body.descricao,
        pontos: req.body.pontos,
        ativa: req.body.ativa,
      });

      dataRead.tarefas.splice(index, 1);
      dataRead.tarefas.push(changedTarefa);

      var tarefas = dataRead.tarefas;
      tarefas = sortJsonArray(tarefas, 'id')

      dataRead.tarefas = tarefas;

      fs.writeFile('./api/data/tarefas.json', JSON.stringify(dataRead), 'utf-8', () => { console.log('OK') });

      res.status(200).json(changedTarefa);
    });
  };


  return controller;
}