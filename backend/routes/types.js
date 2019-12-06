const router = require('express').Router();
let Type = require('../models/types');

//first route endpoint that handles http get requests
//this is localhost:5000/types/
router.route('/').get((req, res) => {
    Type.find()
      .then(types => res.json(types))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  //this is a post request
router.route('/').post((req, res) => {
    const name = req.body.name;
  
    const newType = new Type({
      name
    });
  
    newType.save()
      .then(() => res.json('Crop Type added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;
