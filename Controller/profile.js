const validate = require('../ErrorHandlers/Validate')

const profileHandler = (req, res, db) => {
    let userId = req.params.id;
    console.log(userId);

    db.select('*').from('users')
        .where('id', userId)
        .then(us => console.log(us))
        .then(user => validate.validateUser(res, user))
        .catch(() => console.log('can not retrieve user'));
}

module.exports = {
    profileHandler: profileHandler
}