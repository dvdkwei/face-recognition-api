/**
 * Approves if an instance exist in DB.
 *
 * @param res Response handler
 * @param data the data to approve
 */
const validate = (res, data) => {
    data.length ? res.json(data[0]) : res.status(400).send('no user found');
}

module.exports = {
    validateUser: validate
}