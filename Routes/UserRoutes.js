const UserHandler = require('../Controllers/UserController');
const SessionHandler = require('../Middlewares/index');
module.exports = (app) => {
    app.route('/api/user/create')
        .post(UserHandler.signup);
    app.route('/api/user/signin')
        .post(UserHandler.signin);
    app.route('/api/users')
        .get([SessionHandler.verfiyToken], UserHandler.getUsers);
    app.route('/api/user/delete')
        .post([SessionHandler.verfiyToken], UserHandler.deleteUser);
}