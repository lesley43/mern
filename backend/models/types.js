const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema ({
    name: String,
  });
  
  const Type = mongoose.model('Type', typeSchema);
  
  module.exports = Type;
