const socketIO = require('socket.io');
const Chat = require('../models/Chat');
const jwt = require('jsonwebtoken');

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Authorization"]
    },
    transports: ['websocket', 'polling']
  });

  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.user.userId);
    
    socket.join(socket.user.userId);

    socket.on('sendMessage', async (data) => {
      try {
        const { chatId, message } = data;
        const chat = await Chat.findById(chatId)
          .populate('customer', 'name email')
          .populate('seller', 'name email');
        
        if (!chat) {
          console.error('Chat not found:', chatId);
          return;
        }

        // Save message to database
        chat.messages.push({
          sender: socket.user.userId,
          content: message.content,
          timestamp: new Date()
        });
        chat.lastMessage = new Date();
        await chat.save();

        const sellerId = chat.seller._id.toString();
        const customerId = chat.customer._id.toString();
        const senderId = socket.user.userId;

        const messageData = {
          chatId,
          message: {
            ...message,
            sender: {
              _id: senderId,
              name: senderId === sellerId ? chat.seller.name : chat.customer.name,
              email: senderId === sellerId ? chat.seller.email : chat.customer.email
            }
          }
        };

        console.log('Emitting message to seller:', sellerId);
        console.log('Emitting message to customer:', customerId);
        
        // Emit to both parties
        io.to(sellerId).emit('message', messageData);
        io.to(customerId).emit('message', messageData);

      } catch (error) {
        console.error('Socket error:', error);
      }
    });

    socket.on('typing', (data) => {
      const { chatId, isTyping } = data;
      socket.broadcast.emit('typing', {
        chatId,
        userId: socket.user.userId,
        isTyping
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.user.userId);
    });
  });

  return io;
}; 