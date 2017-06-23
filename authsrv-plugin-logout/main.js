module.exports = (app, authService, db) => {
    const tokensDb = db.sublevel('tokens');
    const oldLogin = authService.login;

    authService.login = (username, password, callback) => {
        oldLogin(username, password, (err, token) => {
            if (err) return callback(err)

            tokensDB.put(token, { username: username }, () => {
                callback(null, token)
            })
        })
    }

    let oldCheckToken = authService.checkToken;
    authService.checkToken = (token, callback) => {
        tokensDB.get(token, (err, res) => {
            if (err) return callback(err)
            oldCheckToken(token, callback)
        })
    }

    authService.logout = (token, callback) => {
        tokensDB.del(token, callback)
    }

    app.get('/logout', (req, res, next) => {
        authService.logout(req.query.token, () => {
            res.status(200).send({ ok: true })
        })
    })
}