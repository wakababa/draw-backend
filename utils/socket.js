const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Drawing = require('../models/drawModel');
const Room = require('../models/roomModel');

let io;

module.exports = {
    initialize: (server) => {
        io = socketIO(server, {
            cors: {
                origin: "http://localhost:9000",
                methods: ["GET", "POST"],
                allowedHeaders: ["Content-Type", "Authorization"],
                credentials: true
            }
        });

        io.use(async (socket, next) => {
            const token = socket.handshake.headers['authorization']?.split(' ')[1];
            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    const user = await User.findById(decoded.id).select('-password');
                    if (!user) {
                        return next(new Error('Authentication error'));
                    }
                    socket.request.user = user;
                    next();
                } catch (error) {
                    return next(new Error('Authentication error'));
                }
            } else {
                next(new Error('Authentication error'));
            }
        });

        io.on('connection', (socket) => {
            console.log('New client connected');

            socket.on('joinRoom', async (roomId) => {
                socket.join(roomId);
                const drawing = await Drawing.findOne({ roomId });
                if (drawing) {
                    socket.emit('loadDrawing', drawing.drawData);
                }

                const user = socket.request.user;
                if (user && !user.recentRooms.includes(roomId)) {
                    user.recentRooms.push(roomId);
                    await user.save();
                }
            });

            socket.on('draw', async (data) => {
                const { roomId, x0, y0, x1, y1 } = data;
                socket.to(roomId).emit('draw', { x0, y0, x1, y1 });

                let drawing = await Drawing.findOne({ roomId });
                if (!drawing) {
                    drawing = new Drawing({ roomId, drawData: [] });
                }
                drawing.drawData.push({ x0, y0, x1, y1 });
                await drawing.save();
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialized');
        }
        return io;
    }
};
