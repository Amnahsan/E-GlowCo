const Chat = require('../models/Chat');

// Get all chats for a user (seller/customer)
exports.getChats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const role = req.user.role;
    
    // Update query to find chats where user is either seller or customer
    const query = {
      $or: [
        { seller: userId },
        { customer: userId }
      ]
    };

    const chats = await Chat.find(query)
      .populate('customer', 'name email')
      .populate('seller', 'name email')
      .populate('messages.sender', 'name email')
      .sort({ lastMessage: -1 });

    console.log('Found chats:', chats); // Add this for debugging
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Error fetching chats' });
  }
};

// Get chat messages
exports.getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId)
      .populate('messages.sender', 'name');
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json(chat.messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const senderId = req.user.userId;

    const chat = await Chat.findById(chatId)
      .populate('customer', 'name email')
      .populate('seller', 'name email');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Create new message
    const newMessage = {
      sender: senderId,
      content,
      timestamp: new Date()
    };

    // Add message to chat
    chat.messages.push(newMessage);
    chat.lastMessage = new Date();
    await chat.save();

    // Return the populated message
    const populatedMessage = {
      ...newMessage,
      sender: {
        _id: senderId,
        name: senderId === chat.seller._id ? chat.seller.name : chat.customer.name,
        email: senderId === chat.seller._id ? chat.seller.email : chat.customer.email
      }
    };

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
};

// Create chat
exports.createChat = async (req, res) => {
  try {
    const { customerId } = req.body;
    const sellerId = req.user.userId;

    // Check if chat already exists
    let chat = await Chat.findOne({
      $or: [
        { customer: customerId, seller: sellerId },
        { customer: sellerId, seller: customerId }
      ]
    }).populate('customer', 'name email')
      .populate('seller', 'name email');

    if (chat) {
      return res.json(chat);
    }

    // Create new chat
    chat = new Chat({
      customer: customerId,
      seller: sellerId,
      messages: [],
      lastMessage: new Date()
    });

    await chat.save();
    
    // Populate the newly created chat
    chat = await Chat.findById(chat._id)
      .populate('customer', 'name email')
      .populate('seller', 'name email');

    res.status(201).json(chat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ message: 'Error creating chat' });
  }
};

// Mark messages as read
exports.markAsRead = async (req, res) => {
  // Implementation
}; 