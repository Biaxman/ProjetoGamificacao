const mongoose = require('mongoose');

mongoose.connect('mongodb://adminGamificacao:123456@localhost:27017/Gamificacao')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("MongoDB conectado.");
});