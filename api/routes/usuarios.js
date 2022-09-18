module.exports = app => {
    const controller = app.controller.usuarios;

    app.route('/api/v1/usuarios')
        .get(controller.listUsuarios)
        .post(controller.createUsuario)
        .put(controller.updateUsuario);

    app.route('/api/v1/usuarios/:usuarioId')
        .get(controller.listUsuarioId)
        .delete(controller.removeUsuarioId);
}