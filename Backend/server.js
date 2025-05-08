

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

const io = new Server(server, {
    cors: {
        origin: 'https://grevocab-app-1-frontend.onrender.com',
        methods: ["POST", "GET", "PUT"]
    }
});

app.use(express.json());



app.use(cors({
    origin: '*', // Temporarily allow all origins
    methods: ["POST", "GET", "PUT"],
    credentials: true
}));



app.use('/api/users', require('./src/routes/userRoutes'));





const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


