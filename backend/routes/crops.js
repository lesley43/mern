const router = require('express').Router();
let Crop = require('../models/crop');

//first route endpoint that handles http get requests
//this is localhost:5000/crops/
router.route('/').get((req, res) => {
  Crop.find()
    .then(crops => res.json(crops))
    .catch(err => res.status(400).json('Error: ' + err));
});

//this is a post request
router.route('/').post((req, res) => {
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


//that's object id from the database (Atlas makes the id)
router.route('/:id').get((req, res) => {
  Crop.findById(req.params.id) //getting the id directly from the url
    .then(crop => res.json(crop))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Crop.findByIdAndDelete(req.params.id)
    .then(() => res.json('Crop deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//must have all fields to update, can't have one or the other
router.route('/:id').post((req, red) => {
  Crop.findById(req.params.id) //find current crop
    .then(crop => { 
      crop.name = req.body.name,
      crop.type = {
        _id: type._id,
        name: type.name
      },
      crop.plantSeason = req.body.plantSeason,
      harvestSeason = req.body.harvestSeason,
      lifeCycle = req.body.lifeCycle
    
      crop.save()
        .then(() => res.json('Crop updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;


