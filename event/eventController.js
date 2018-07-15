var express = require('express');
var Event = require('./event');

const router = express.Router();

// get all
router.get('/', (req, res, next) => {
    if (!req.get('X-Username')) {
        res.status(400).json({error: 'username_missing'});
        return;
    }

    Event.find({username: req.get('X-Username')}, '-username', (err, events) => {
        if (err) return next(err);
        res.json(events.map(event => toObject(event)));
    });
});

// get one
router.get('/:id', (req, res) => {
    Event.findById(req.params.id, '-username', (err, event) => {
        if (err) return next(err);
        if (!event) {
            res.status(404).json({error: 'no_such_id'});
            return;
        }
        res.json(toObject(event));
    });
});

// create
router.post('/', (req, res, next) => {
    if (!req.get('X-Username')) {
        res.status(400).json({error: 'username_missing'});
        return;
    }

    // Event.find('_id', null, {sort: {'_id': -1}, limit: 1}, function (err, lastEvent) {

    Event.findOne({}, '_id').sort({'_id': 'desc'}).limit(1).exec((err, lastEvent) => {
        if (err) return next(err);

        const event = req.body;
        event._id = lastEvent ? lastEvent._id + 1 : 0;
        event.username = req.get('X-Username');

        Event.create(event, (err, createdEvent) => {
            if (err) return next(err);
            res.status(201).send('');
        });
    });
});

// update
router.put('/:id', (req, res, next) => {
    if (!req.get('X-Username')) {
        res.status(400).json({error: 'username_missing'});
        return;
    }

    const event = req.body;
    event.username = req.get('X-Username');

    Event.findByIdAndUpdate(req.params.id, event, {}, function (err, updatedEvent) {
        if (err) return next(err);
        if (!updatedEvent) {
            res.status(400).json({error: 'no_such_id'});
            return;
        }
        res.status(204).send('');
    });
});

// delete
router.delete('/:id', (req, res, next) => {
    Event.deleteOne({_id: req.params.id}, function (err) {
        if (err) return next(err);
        res.status(204).send('');
    });
});

function toObject(event) {
    return event.toObject({versionKey: false});
}

module.exports = router;
