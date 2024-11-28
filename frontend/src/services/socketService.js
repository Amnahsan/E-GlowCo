import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.messageHandlers = new Set();
    this.typingHandlers = new Set();
  }

  init() {
    this.socket = io('http://localhost:3001', {
      auth: {
        token: localStorage.getItem('token')
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    this.setupListeners();
  }

  setupListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket');
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.userId) {
        this.socket.emit('join', user.userId);
      }
    });

    this.socket.on('message', (message) => {
      this.messageHandlers.forEach(handler => handler(message));
    });

    this.socket.on('typing', (data) => {
      this.typingHandlers.forEach(handler => handler(data));
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setTimeout(() => {
        this.socket.connect();
      }, 5000);
    });
  }

  sendMessage(chatId, message) {
    if (this.socket) {
      console.log('Sending message:', { chatId, message });
      this.socket.emit('sendMessage', { chatId, message });
    } else {
      console.error('Socket not initialized');
    }
  }

  sendTyping(chatId, isTyping) {
    if (this.socket) {
      this.socket.emit('typing', { chatId, isTyping });
    }
  }

  onMessage(handler) {
    console.log('Adding message handler');
    this.messageHandlers.add(handler);
    return () => {
      console.log('Removing message handler');
      this.messageHandlers.delete(handler);
    };
  }

  onTyping(handler) {
    this.typingHandlers.add(handler);
    return () => this.typingHandlers.delete(handler);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService(); 