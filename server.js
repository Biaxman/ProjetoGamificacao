const app = require('./config/express')();
const port = app.get('port');
const mongoose = require('./config/mongoose');

app.listen(port, () => {
    console.log('Servidor Online (' + port + ')')
});