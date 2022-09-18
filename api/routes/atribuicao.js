module.exports = app => {
    const controller = app.controller.atribuicao;

    app.route('/api/v1/atribuicao')
    .get(controller.listAtribuicao)
    .post(controller.createAtribuicao)
    
    app.route('/api/v1/atribuicao/:atribuicaoId')
    .get(controller.listAtribuicaoId)
    .delete(controller.removeAtribuicaoId);
}