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

router.delete("/:id", (req,res) => {
    let id = req.params.id;
    let deletingChirp = chirpStore.GetChirp(id);
    if (id && Object.keys(deletingChirp).length) {
        chirpStore.DeleteChirp(id);
        res.status(200);
    } else {
        res.status(404);
    }
});

router.put("/:id", (req,res) => {
    let id = req.params.id;
    let newChirp = req.body;
    let editingChirp = chirpStore.GetChirp(id);
    if (id && Object.keys(editingChirp).length) {
        chirpStore.UpdateChirp(id, newChirp);
        res.status(200);
    } else {
        res.status(404);
    }
})

module.exports = router;