const router = require('express').Router();
let PlotButton = require('../models/plot-button.model');

//first route endpoint that handles http get requests
//this is localhost:5000/plotbutton/
router.route('/').get((req, res) => {
  PlotButton.find()
    //return them in the form of a json
    .then(plotbuttons => res.json(plotbuttons))
    .catch(err => res.status(400).json('Error: ' + err));
});

//this is a post request - add
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const r = req.body.r;
  const g = req.body.g;
  const b = req.body.b;
  const a = req.body.a;

  const newPlotButton = new PlotButton({
    name,
    r,
    g,
    b,
    a,
  });

  newPlotButton.save()
    .then(() => res.json('Button added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Event.findById(req.params.id) //getting the id directly from the url
    .then(crop => res.json(crop))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get DB entry by name
router.route('/:name').get((req, res) => {
  PlotButton.find({name: req.params.name}) //getting the name directly from the url
    .then(button => res.json(button))
    .catch(err => res.status(400).json('Error: ' + err));
});

//--delete
router.route('/:id').delete((req, res) => {
  PlotButton.findByIdAndDelete(req.params.id)
    .then(() => res.json('Button deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
});

//--update by name
router.route('/update/:id').post((req, res) => {
  console.log("im running");
  PlotButton.findById(req.params.id)
    .then(button => {
      button.name = req.body.name;
      button.r = req.body.r;
      button.g = req.body.g;
      button.b = req.body.b;
      button.a = req.body.a;

      button.save()
        .then(() => res.json('Button updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
