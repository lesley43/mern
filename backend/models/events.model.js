var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const eventsSchema = new Schema({
  date: String,
  details: String
});

const Event = mongoose.model('Event', eventsSchema);

module.exports = Event;
