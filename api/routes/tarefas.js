module.exports = app => {
    const controller = app.controller.tarefas;

    app.route('/api/v1/tarefas')
    .get(controller.listTarefas);
    
    app.route('/api/v1/tarefaId/:tarefaId')
    .get(controller.listTarefaId)
    .delete(controller.removeTarefaId);
}