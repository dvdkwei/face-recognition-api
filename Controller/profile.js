const validate = require('../ErrorHandlers/Validate')

const profileHandler = (req, res, db) => {
    let {id} = req.params;

    db.select('*').from('users')
        .where({id})
        .then(user => validate.validateUser(res, user));
}

module.exports = {
    profileHandler: profileHandler
}