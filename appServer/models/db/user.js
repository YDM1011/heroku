const mongoose = require('mongoose');
const user = new mongoose.Schema({
    email: {type: String, required: true},
    login: {type: String, required: true},
    password: {type: String, required: true},
    veryfi: {type: Boolean, required: true},
    createdOn: {type: Date, "default": Date.now}
});
mongoose.model('user', user);