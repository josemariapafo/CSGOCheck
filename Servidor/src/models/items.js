const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemsSchema = new Schema({
    fecha: {type: String, required: true},
    items: [
        {
            name : String,
            wears : Object,
            price: Number
        }
    ]
})
module.exports = mongoose.model('Items', ItemsSchema);