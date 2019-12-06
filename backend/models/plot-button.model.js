const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plotButtonSchema = new Schema ({
  name: String,
  r: String,
  g: String,
  b: String,
  a: String,
});

const PlotButton = mongoose.model('PlotButton', plotButtonSchema);

module.exports = PlotButton;
