var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    _id: Number,
    name: {type: String, required: true},
    start: {type: String, required: true}, // TODO add validation
    end: {type: String, required: true}, // TODO add validation
    description: String
});

module.exports = mongoose.model('Event', eventSchema);
