const validate = require('../ErrorHandlers/Validate')

const profileHandler = (req, res, db) => {
    let {id} = req.params;

    db.select('*').from('users')
        .where('id = ' + {id})
        .then(user => validate.validateUser(res, user))
        .catch(() => console.log('can not retrieve user'));
}

module.exports = {
    profileHandler: profileHandler
}