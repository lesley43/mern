const router = require('express').Router();
let Event = require('../models/events.model');

router.route('/').get((req, res) => {
  Event.find()
    //return them in the form of a json
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

//this is where frontend create-event.component.js sends it's axios.post to
router.route('/add').post((req, res) => {
  const date = req.body.date;
  const details = req.body.details;

  const newEvent = new Event({
    date,
    details,
  });

  newEvent.save()
    .then(() => res.json('Event added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//that's object id from the database (Atlas makes the id)
router.route('/:id').get((req, res) => {
  Event.findById(req.params.id) //getting the id directly from the url
    .then(crop => res.json(crop))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json('Event deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//must have all fields to update, can't have one or the other
router.route('/update/:id').post((req, red) => {
  Event.findById(req.params.id) //find current event
    .then(event => {
      event.date = req.body.date;
      event.details = req.body.details;

      event.save()
        .then(() => res.json('Event updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
