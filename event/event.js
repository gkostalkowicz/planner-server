var mongoose = require('mongoose');
var js_joda = require('js-joda');

const Schema = mongoose.Schema;
const LocalDate = js_joda.LocalDate;

const eventSchema = new Schema({
    _id: Number,
    username: {type: String, required: true},
    name: {type: String, required: true},
    start: {type: String, required: true, validate: {validator: isDateValid, message: '{VALUE} is not a valid date'}},
    end: {type: String, required: true, validate: {validator: isDateValid, message: '{VALUE} is not a valid date'}},
    description: String
});

function isDateValid(dateString) {
    try {
        LocalDate.parse(dateString);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = mongoose.model('Event', eventSchema);
