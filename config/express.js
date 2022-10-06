const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');

module.exports = () => {
    const app = express();

    app.set('port', process.env.PORT || config.get('server.port'));

    app.use(bodyParser.json());

    consign({ 
        cwd: 'api',
        verbose:false
    })
        //.include('models')
        .then('controller')
        .then('routes')
        .into(app);

    return app;
};