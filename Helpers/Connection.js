const mongoose = require('mongoose');


exports.connect = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => {
        console.log('Connected to Application Users!');
    }).catch(err => console.log(err))
}