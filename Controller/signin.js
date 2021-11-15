const validate = require('../ErrorHandlers/Validate')

const handleSignIn = (bcrypt, db, req, res) => {
    const {email, password} = req.body;

    db.select('*').from('login')
        .where('email', '=', email)
        .then(data => {
            bcrypt.compareSync(password, data[0].hash) ?
                db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => validate.validateUser(res, user)) :
                res.status(400).send('wrong credentials')
        })
        .catch(() => res.status(400).send('wrong credentials'));
}

module.exports = {
    handleSignIn: handleSignIn
}