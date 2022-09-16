module.exports = app => {
    const controller = app.controller.tarefas;

    app.route('/api/v1/tarefas')
    .get(controller.listTarefas);
}