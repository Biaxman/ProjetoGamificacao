module.exports = app => {
    const fs = require('fs');

    const tarefasDB = app.data.tarefas;
    const controller = {};

    controller.listTarefas = (req, res) => {
        var dataRead;
        fs.readFile('./api/data/tarefas.json','utf-8',(err,data) => {
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

        fs.readFile('./api/data/tarefas.json','utf-8',(err,data) => {
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

        fs.readFile('./api/data/tarefas.json','utf-8',(err,data) => {
            if (err) {
              console.error(err);
              return;
            }
            
            dataRead = JSON.parse(data);
            var index = dataRead.tarefas.findIndex(tarefa => tarefa.id >= tarefaId);
            dataRead.tarefas.splice(index,1);
            fs.writeFile('./api/data/tarefas.json',JSON.stringify(dataRead) ,'utf-8',()=>{console.log('OK')});
          });
      };

    return controller;
}