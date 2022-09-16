module.exports = app => {
    const tarefasDB = app.data.tarefas;
    const controller = {};

    controller.listTarefas = (req, res) => res.status(200).json(tarefasDB);

    return controller;
}