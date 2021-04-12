const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./Models/Users');
require('./Helpers/Connection').connect();
const PORT = process.env.PORT || 8000;

const server = express();
server.use(bodyParser.json());

require('./Routes/UserRoutes')(server);

server.listen(PORT, () => {
    console.log('Server Started listening on port', PORT);
})

