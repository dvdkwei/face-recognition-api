const validate = require('../ErrorHandlers/Validate');
const Clarifai = require('clarifai');

const app = new Clarifai.App(
    {
        apiKey: '172f16ecf59641dd86eec7df17672f98'
    }
);

const imageApiHandler = (req, res) => {
    app.models
        .predict({
            id: "f76196b43bbd45c99b4f3cd8e8b40a8a",
            version: "45fb9a671625463fa646c3523a3087d5",
        }, req.body.input)
        .then(data => res.json(data))
        .catch(() => res.status(400).send('Unable to work with API'));
}

const imageHandler = (req, res, db) => {
    let {id} = req.params;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entry => validate.validateUser(res, entry));
}

module.exports = {
    imageHandler: imageHandler,
    imageApiHandler: imageApiHandler
}