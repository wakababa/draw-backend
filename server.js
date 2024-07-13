const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const http = require('http');
const connectDB = require('./utils/db');
const socket = require('./utils/socket');

connectDB();

const server = http.createServer(app);
socket.initialize(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
