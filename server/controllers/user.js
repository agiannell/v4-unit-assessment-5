const bcrypt = require('bcryptjs'),
      saltRounds = 10;

module.exports = {
    register: async(req, res) => {
        const { username, password, profile_pic } = req.body,
              db = req.app.get('db')

        const [foundUser] = await db.user.find_user_by_username(username);
        if (foundUser) {
            return res.status(400).send('Username already in use');
        };

        const salt = bcrypt.genSaltSync(saltRounds),
              hash = bcrypt.hashSync(password, salt);
              
        const [newUser] = await db.user.create_user([username, hash, profile_pic])

        req.session.user = newUser;
        res.status(201).send(req.session.user)
    },
    login: async(req, res) => {
        const { username, password } = req.body,
              db = req.app.get('db');

        const [foundUser] = await db.user.find_user_by_username(username);
        if (!foundUser) {
            return res.status(404).send('Username not found');
        };

        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if (!authenticated) {
            return res.status(401).send('Password is incorrect')
        };
        delete foundUser.password;

        req.session.user = foundUser;
        res.status(202).send(req.session.user);
    },
    getUser: (req, res) => {

    },
    logout: (req, res) => {

    }
};