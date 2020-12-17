const mongoose = require('mongoose');
const URI = 'mongodb://localhost/inversiones-web';

mongoose.connect(URI)
    .then(db => console.log("BD is conected"))
    .catch(err => console.log(err))

    module.exports = mongoose;