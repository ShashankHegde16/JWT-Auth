import express from 'express';

const PORT = process.env.PORT || 8000;

const server = express();

server.listen(PORT, () => {
    console.log('Server Started and listening on Port', PORT);
})