const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropsSchema = new Schema ({
  name: String,
  cropType: String,
  plantSeason: String,
  harvestSeason: String,
  lifeCycle: String,
});

const Crop = mongoose.model('Crop', cropsSchema);

module.exports = Crop;
