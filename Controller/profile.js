const validate = require('../ErrorHandlers/Validate')

const profileHandler = (req, res, db) => {
    let userId = Number.parseInt(req.params.id);
    console.log(userId);

    db.select().from('users')
        .where('id', userId)
        // .then(us => console.log('from profile.js: ' + JSON.stringify(us, null, 4))) -->
        // CAUSING BUGS, NO CONSOLE LOGS!!!!
        .then(user => validate.validateUser(res, user))
        .catch(() => res.status('400').send('can not retrieve user'));
}

module.exports = {
    profileHandler: profileHandler
}