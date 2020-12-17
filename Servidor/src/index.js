const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./database');
const app = express();

// Setting
app.set('port', process.env.PORT || 4000);
app.set('trust proxy', true);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// Middlewares
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// Routes
app.use('/api/inversiones',require('./routes/inversiones.routes'));
app.use('/api/items',require('./routes/items.routes'));
app.use('/api/inversionesUsuario',require('./routes/inventariosUsuario.routes'));

// Starting the server
app.listen(4000, () =>{
    console.log("server open on port "+app.get('port'))
})
