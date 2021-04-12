const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = mongoose.model('Users');

exports.signup = async function (req, res) {
    const newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    try {
        const existingUser = await User.findOne({ email_id: email_id });
        if (existingUser)
            return res.status(409).send("User id already exists...");
        const resp = await newUser.save();
        return res.status(200).send('User Created Succesfully!');

    } catch (e) {
        return res.status(400).send('Bad Request..');
    }

}

exports.signin = async function (req, res) {
    const { emailAddress, password } = req.body;
    try {
        const user = await User.findOne({ email_id: emailAddress });
        if (!user)
            return res.status(404).send('User does not exists!');
        const passmatch = bcrypt.compareSync(password, user.password);
        if (!passmatch) {
            return res.status(401).send('Invalid Credentials..');
        }
        const accessToken = jwt.sign({ email_id: emailAddress }, process.env.SECRET_KEY, {
            expiresIn: 86400 // 24 hours
        });
        return res.header("auth-token", accessToken).status(200).json({
            emailAddress,
            accessToken
        });

    } catch (e) {
        return res.status(400).send('Bad Request..');
    }
}

exports.getUsers = async function (req, res) {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    try {
        const response = await User.aggregate([
            { $match: {} },
            { $sort: { created_at: -1 } },
            { $skip: parseInt(skip) },
            { $limit: parseInt(limit) },
            { $project: { "email_id": 1, "created_at": 1 } }]);
        return res.status(201).send(response);
    } catch (e) {
        return res.status(400).send('Bad Request..')
    }
}

exports.deleteUser = async function (req, res) {
    const { email } = req.query;
    try {
        const resp = await User.findOneAndDelete({ email_id: email });
        return res.status(200).send('User id has been removed..');

    } catch (e) {
        return res.status(400).send('Bad Request/ User doesnt exists..');
    }

}

