module.exports = app => {
    const controller = app.controller.tarefas;

    app.route('/api/v1/tarefas')
    .get(controller.listTarefas)
    .post(controller.createTarefa)
    .put(controller.updateTarefa);
    
    app.route('/api/v1/tarefaId/:tarefaId')
    .get(controller.listTarefaId)
    .delete(controller.removeTarefaId);
}