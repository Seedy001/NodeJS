const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
 userSchema.plugin(uniqueValidator) //permet de resteindre les user a utiliser 1 unique email 

module.exports = mongoose.model('user', userSchema);
