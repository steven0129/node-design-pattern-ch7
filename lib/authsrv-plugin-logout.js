const parentRequire = module.parent.require

const authService = parentRequire('./lib/authService')
const db = parentRequire('./lib/db')
const app = parentRequire('./app')
const tokensDB = db.sublevel('tokens')

const oldLogin = authService.login
authService.login = (username, password, callback) => {
    oldLogin(username, password, (err, toekn) => {
        if (err) return callback(err)

        tokensDB.put(token, { username: username }, () => {
            callback(null, token)
        })
    })

}

const oldCheckToken = authService.checkToken
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