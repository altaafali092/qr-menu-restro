import React, { useState } from 'react';

export default function OrderNowPage({ menuItems = [] }) {
    const [cartItems, setCartItems] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [orderForm, setOrderForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        specialInstructions: '',
        paymentMethod: 'card'
    });

    // Add item to cart
    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    // Update quantity
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity === 0) {
            setCartItems(cartItems.filter(item => item.id !== id));
        } else {
            setCartItems(cartItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    const tax = subtotal * 0.08;
    const delivery = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + tax + delivery;

    // Handle order submission
    const handleSubmit = () => {
        setCurrentStep(4);
        // Here you would integrate with your Laravel backend
        setTimeout(() => {
            alert('Order placed successfully!');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-xl bg-white/10 rounded-full px-8 py-3 border border-white/20">
                <div className="flex items-center space-x-8">
                    <div className="text-white font-bold text-xl">Order Now</div>
                    <div className="hidden md:flex items-center space-x-6 text-sm">
                        <div className="text-purple-300">Cart ({cartItems.length})</div>
                        <div className="text-white/60">•</div>
                        <div className="text-white/80">${total.toFixed(2)}</div>
                    </div>
                </div>
            </nav>

            {/* Progress Steps */}
            <section className="pt-32 pb-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center space-x-4">
                            {[
                                { step: 1, label: 'Menu', icon: '🍽️' },
                                { step: 2, label: 'Cart', icon: '🛒' },
                                { step: 3, label: 'Details', icon: '📋' },
                                { step: 4, label: 'Confirm', icon: '✅' }
                            ].map((item, index) => (
                                <div key={item.step} className="flex items-center">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                                        currentStep >= item.step
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white'
                                            : 'border-white/30 text-white/60'
                                    }`}>
                                        <span className="text-sm">{item.icon}</span>
                                    </div>
                                    <span className={`ml-2 text-sm font-medium ${
                                        currentStep >= item.step ? 'text-white' : 'text-white/60'
                                    }`}>
                                        {item.label}
                                    </span>
                                    {index < 3 && (
                                        <div className={`w-8 h-0.5 mx-4 ${
                                            currentStep > item.step ? 'bg-purple-400' : 'bg-white/20'
                                        }`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <main className="px-4 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Menu/Form */}
                        <div className="lg:col-span-2">
                            {currentStep === 1 && (
                                <div>
                                    <h2 className="text-4xl font-bold text-white mb-8">Select Your Items</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {menuItems.map((item) => (
                                            <div key={item.id} className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                                        {item.image ? (
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl">🍽️</div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                                                        <p className="text-white/60 text-sm line-clamp-1">{item.description}</p>
                                                        <div className="text-purple-300 font-bold">${parseFloat(item.price).toFixed(2)}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                                                    >
                                                        Add +
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div>
                                    <h2 className="text-4xl font-bold text-white mb-8">Delivery Details</h2>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={orderForm.name}
                                                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                                                    className="w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none transition-colors"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={orderForm.email}
                                                    onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                                                    className="w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none transition-colors"
                                                    placeholder="your.email@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-white/80 text-sm font-medium mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                value={orderForm.phone}
                                                onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                                                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none transition-colors"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-white/80 text-sm font-medium mb-2">Delivery Address</label>
                                            <textarea
                                                required
                                                value={orderForm.address}
                                                onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                                                rows="3"
                                                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                                                placeholder="123 Main St, City, State, ZIP"
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-white/80 text-sm font-medium mb-2">Special Instructions (Optional)</label>
                                            <textarea
                                                value={orderForm.specialInstructions}
                                                onChange={(e) => setOrderForm({...orderForm, specialInstructions: e.target.value})}
                                                rows="2"
                                                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                                                placeholder="Any special requests or dietary restrictions..."
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-white/80 text-sm font-medium mb-4">Payment Method</label>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {[
                                                    { id: 'card', label: 'Credit Card', icon: '💳' },
                                                    { id: 'paypal', label: 'PayPal', icon: '📱' },
                                                    { id: 'cash', label: 'Cash on Delivery', icon: '💵' }
                                                ].map((method) => (
                                                    <label key={method.id} className="cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value={method.id}
                                                            checked={orderForm.paymentMethod === method.id}
                                                            onChange={(e) => setOrderForm({...orderForm, paymentMethod: e.target.value})}
                                                            className="sr-only"
                                                        />
                                                        <div className={`backdrop-blur-xl border rounded-xl p-4 text-center transition-all duration-300 ${
                                                            orderForm.paymentMethod === method.id
                                                                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400 text-white'
                                                                : 'bg-white/10 border-white/20 text-white/70 hover:border-white/40'
                                                        }`}>
                                                            <div className="text-2xl mb-2">{method.icon}</div>
                                                            <div className="font-medium">{method.label}</div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                                        >
                                            Place Order • ${total.toFixed(2)}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-6">🎉</div>
                                    <h2 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h2>
                                    <p className="text-white/70 text-lg mb-8">
                                        Thank you for your order. We'll start preparing your delicious meal right away!
                                    </p>
                                    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
                                        <div className="text-white/60 text-sm mb-2">Estimated Delivery</div>
                                        <div className="text-2xl font-bold text-purple-300">30-45 minutes</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Cart Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32">
                                <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>
                                        
                                        {cartItems.length === 0 ? (
                                            <div className="text-center py-8">
                                                <div className="text-4xl mb-4">🛒</div>
                                                <p className="text-white/60">Your cart is empty</p>
                                                <p className="text-white/40 text-sm">Add items from the menu</p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                                    {cartItems.map((item) => (
                                                        <div key={item.id} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                                                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                                {item.image ? (
                                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white">🍽️</div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="text-white font-medium text-sm">{item.name}</h4>
                                                                <div className="text-purple-300 text-sm">${parseFloat(item.price).toFixed(2)}</div>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    className="w-6 h-6 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="text-white w-6 text-center">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="w-6 h-6 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="border-t border-white/20 pt-4 space-y-2">
                                                    <div className="flex justify-between text-white/70">
                                                        <span>Subtotal</span>
                                                        <span>${subtotal.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-white/70">
                                                        <span>Tax (8%)</span>
                                                        <span>${tax.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-white/70">
                                                        <span>Delivery</span>
                                                        <span>{delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}</span>
                                                    </div>
                                                    <div className="border-t border-white/20 pt-2 flex justify-between text-white font-bold text-lg">
                                                        <span>Total</span>
                                                        <span>${total.toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-6 space-y-3">
                                                    {currentStep === 1 && (
                                                        <button
                                                            onClick={() => setCurrentStep(2)}
                                                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                                                        >
                                                            Review Cart
                                                        </button>
                                                    )}
                                                    {currentStep === 2 && (
                                                        <button
                                                            onClick={() => setCurrentStep(3)}
                                                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                                                        >
                                                            Proceed to Checkout
                                                        </button>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {delivery === 0 && subtotal > 0 && (
                                    <div className="mt-4 backdrop-blur-xl bg-green-500/20 rounded-xl p-4 border border-green-400/30">
                                        <div className="text-green-300 text-sm font-medium">🎉 Free delivery on orders over $50!</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}