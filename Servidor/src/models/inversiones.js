const mongoose = require('mongoose');
const { Schema } = mongoose;

const InversionesSchema = new Schema({
    usuario: { type: String, required:true},
    contrasena: { type: String, required: true},
    steamId: {type: Number, required: true},
    inventario: [
        {
            nombre: String,
            cantidad: Number
        }
    ]
})

module.exports = mongoose.model('Inversiones', InversionesSchema);