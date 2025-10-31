import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items || []);
  const user = useSelector(state => state.auth.user);
  
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Pre-fill user data if available
    if (user) {
      setCheckoutData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!checkoutData.name || !checkoutData.email || !checkoutData.address || 
        !checkoutData.city || !checkoutData.pincode || !checkoutData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    setShowPaymentOptions(true);
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Create order object
    const order = {
      orderId: 'ORD' + Date.now(),
      customer: checkoutData,
      items: cartItems,
      paymentMethod,
      total: total,
      status: paymentMethod === 'cod' ? 'confirmed' : 'pending',
      date: new Date().toISOString()
    };

    // Simulate API call
    try {
      // In a real app, you would send this to your backend
      console.log('Placing order:', order);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setOrderDetails(order);
      setOrderSuccess(true);
      
      // Clear cart after successful order
      dispatch(clearCart());
      
    } catch (error) {
      console.error('Order failed:', error);
      alert('Order failed. Please try again.');
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const product = item.productId || item.product;
    return sum + (product?.price || 0) * (item.quantity || 0);
  }, 0);

  const shipping = total > 500 ? 0 : 40;
  const finalTotal = total + shipping;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please login to access checkout</p>
          <Link 
            to="/login" 
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (orderSuccess && orderDetails) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center py-12 bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="text-green-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">Order Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold">{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold">
                  {orderDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">₹{finalTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-emerald-600">Confirmed</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Thank you for your order! {orderDetails.paymentMethod === 'cod' 
              ? 'Please keep cash ready for delivery.' 
              : 'Your payment is being processed.'}
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/" 
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <button 
              onClick={() => window.print()}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h2>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {!showPaymentOptions ? (
            /* Customer Information Form */
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Customer Information</h3>
              <form onSubmit={handleProceedToPayment} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={checkoutData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={checkoutData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={checkoutData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={checkoutData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your complete delivery address"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={checkoutData.city}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={checkoutData.pincode}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter PIN code"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          ) : (
            /* Payment Options */
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Payment Method</h3>
              
              <div className="space-y-4 mb-6">
                {/* Cash on Delivery Option */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'cod' 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'cod' && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-800">Cash on Delivery</h4>
                        <span className="text-sm text-gray-500">Pay when you receive</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Pay with cash when your order is delivered to your doorstep
                      </p>
                    </div>
                    <div className="text-2xl">💰</div>
                  </div>
                </div>

                {/* Online Payment Option */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'online' 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('online')}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'online' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'online' && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-800">Online Payment</h4>
                        <span className="text-sm text-gray-500">Pay now securely</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Pay securely with credit/debit card, UPI, or net banking
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Credit Card</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Debit Card</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">UPI</span>
                      </div>
                    </div>
                    <div className="text-2xl">💳</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentOptions(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Back to Details
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={!paymentMethod}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                    paymentMethod 
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {paymentMethod === 'online' ? 'Pay Now' : 'Place Order'}
                </button>
              </div>

              {paymentMethod === 'online' && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This is a demo. In a real application, you would be redirected to a secure payment gateway.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Shipping Information */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Shipping Information</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Standard Delivery: 2-3 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Free shipping on orders over ₹500</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Cash on delivery available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>
            
            {/* Order Items */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cartItems.map((item, index) => {
                const product = item.productId || item.product;
                return (
                  <div key={index} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0">
                    {product?.imageUrl && (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{product?.name}</p>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity || 0}</p>
                    </div>
                    <span className="font-semibold text-sm">
                      ₹{((product?.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && total < 500 && (
                <div className="text-xs text-emerald-600 bg-emerald-50 p-2 rounded">
                  Add ₹{(500 - total).toFixed(2)} more for free shipping!
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                <span>Total:</span>
                <span className="text-emerald-700">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Support */}
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
            <p className="text-blue-700 text-sm">
              Contact our support team at <strong>support@snapshop.com</strong> or call <strong>+91-9876543210</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;