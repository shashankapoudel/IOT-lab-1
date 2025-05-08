
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "GET", "PUT", "DELETE", "UPDATE"]
}));


app.use('/api/users', require('./src/routes/userRoutes'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


