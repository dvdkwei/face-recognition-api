const handleRegister = (req, res, bcrypt, db) => {
    let {name, password, email} = req.body;
    let hash = bcrypt.hashSync(password, 10);

    if(name && password && email) {
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    trx('users').returning('*').insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    }).then(user => {
                            res.json(user[0]);
                        }
                    )
                })
                .then(trx.commit)
                .catch(trx.rollback)
        }).catch(() => res.status(400).json('user with this email already exists'));
    }
}

module.exports = {
    handleRegister: handleRegister
}