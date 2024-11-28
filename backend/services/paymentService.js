class PaymentService {
  static async processPayment(order) {
    // Placeholder for payment processing logic
    if (order.paymentMethod === 'Card') {
      // Integrate with payment gateway
      return { success: true, transactionId: 'mock_transaction_id' };
    }
    return { success: true };
  }
}

module.exports = PaymentService; 