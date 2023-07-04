const express = require('express');
const chirpStore = require('../chirpstore')

let router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id
    if (id) {
        res.json(chirpStore.GetChirp(id));
    } else {
        const data = chirpStore.GetChirps();
        const chirps = Object.keys(data).map(key => {
            return {
                id: key,
                user: data[key].user,
                text: data[key].text
            }
        });
        chirps.pop();
        res.json(chirps);
    }
});

router.post('/', (req, res) => {
    chirpStore.CreateChirp(req.body);
    res.sendStatus(200);
});

module.exports = router;