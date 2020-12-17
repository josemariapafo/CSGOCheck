const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventariosUsuariosSchema = new Schema({
    usuario: { type: String, required:true},
    inventarios: []
})

module.exports = mongoose.model('inventariosUsuario', inventariosUsuariosSchema);