const router = require('express').Router();
let Crop = require('../models/crops.model');

//first route endpoint that handles http get requests
//this is localhost:5000/crops/
router.route('/').get((req, res) => {
  Crop.find()
    .then(crops => res.json(crops))
    .catch(err => res.status(400).json('Error: ' + err));
});

//this is a post request
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const cropType = req.body.cropType;
  const plantSeason = req.body.plantSeason;
  const harvestSeason = req.body.harvestSeason;
  const lifeCycle = req.body.lifeCycle;

  const newCrop = new Crop({
    name,
    cropType,
    plantSeason,
    harvestSeason,
    lifeCycle,
  });

  newCrop.save()
    .then(() => res.json('Crop added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
