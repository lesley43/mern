const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plotDivSchema = new Schema ({
  r: String,
  g: String,
  b: String,
  a: String
});

const PlotDiv = mongoose.model('PlotDiv', plotDivSchema);

module.exports = PlotDiv;
