const router = require('express').Router();
let PlotDiv = require('../models/plot-div.model');

//first route endpoint that handles http get requests
//this is localhost:5000/plot/
router.route('/').get((req, res) => {
  PlotDiv.find()
    .then(plotdivs => res.json(plotdivs))
    .catch(err => res.status(400).json('Error: ' + err));
});

//this is a post request - add
router.route('/add').post((req, res) => {
  const r = req.body.r;
  const g = req.body.g;
  const b = req.body.b;
  const a = req.body.a;

  const newDiv = new PlotDiv({
    r,
    g,
    b,
    a,
  });

  newDiv.save()
    .then(() => res.json('Div added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//--update
router.route('/update/:id').post((req, res) => {
  PlotDiv.findById(req.params.id)
    .then(div => {
      div.r = req.body.r;
      div.g = req.body.g;
      div.b = req.body.b;
      div.a = req.body.a;

      div.save()
        .then(() => res.json('Button updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json('Button deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
