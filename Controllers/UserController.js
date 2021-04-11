const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = mongoose.model('Users');

exports.register = function (req, res) {
    const newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.status(200).send('User Created Succesfully!');
        }
    });
}

exports.deleteUser = function (req, res) {
    const { email } = req.query;
    User.findOneAndDelete({
        email_id: email
    }, (err, docs) => {
        if (err)
            console.log('Error in deleting user', err);
        return res.status(200).json('User has been deleted');
    })

}