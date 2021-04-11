const UserHandler = require('../Controllers/UserController');
const SessionHandler = require('../Middlewares/index');
module.exports = (app) => {
    app.route('/api/user/create')
        .post(UserHandler.register);
    app.route('/api/user/delete')
        .post(UserHandler.deleteUser);
}