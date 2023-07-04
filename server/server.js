const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');

let app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter)
app.use(express.urlencoded({ extended: false }));


app.use(express.static("client"));

app.get("/chirps", (req, res) => {
    res.json([ 
        { user, text  }
    ]);
});


app.post("/chirps", (req, res) => {
    const { user, text } = req.body;

    if (!user || !text) {
        res.status(400).json({ message: "Missing data!" });
        return;
    }

    res.status(201).json({ message: "Success!" })
})

app.listen(3000, () => console.log("Server's up!"));
