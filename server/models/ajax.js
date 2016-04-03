var mongoose = require('mongoose');

var AjaxSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    security_question_1: String,
    answer_1: String,
    security_question_2: String,
    answer_2: String,
    phone: String,
    chosen_image: String
});

mongoose.model('Ajax', AjaxSchema);