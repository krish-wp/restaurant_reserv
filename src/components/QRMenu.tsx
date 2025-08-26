import React, { useState } from 'react';
import { Restaurant } from '../types';
import { ArrowLeft, Plus, Minus, ShoppingCart, Leaf, Wheat } from 'lucide-react';

interface QRMenuProps {
  restaurant: Restaurant;
  tableNumber: string;
  onOrder: (orderData: { items: { id: string; quantity: number }[] }) => void;
  onBack: () => void;
}

const QRMenu: React.FC<QRMenuProps> = ({ restaurant, tableNumber, onOrder, onBack }) => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(restaurant.menu.map(item => item.category)))];

  const filteredMenu = selectedCategory === 'All' 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === selectedCategory);

  const addToCart = (itemId: string) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = restaurant.menu.find(m => m.id === itemId);
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const handleOrder = () => {
    const orderItems = Object.entries(cart).map(([id, quantity]) => ({
      id,
      quantity
    }));
    onOrder({ items: orderItems });
    
    // Show success message and reset cart
    alert('Order placed successfully! The restaurant will prepare your order shortly.');
    setCart({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{restaurant.name}</h1>
                <p className="text-sm text-gray-600">Table {tableNumber}</p>
              </div>
            </div>
            
            {getCartItemCount() > 0 && (
              <button
                onClick={handleOrder}
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <ShoppingCart size={20} className="mr-2" />
                Order ({getCartItemCount()}) • ${getCartTotal().toFixed(2)}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h2>
              <p className="text-gray-600 mb-2">{restaurant.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">{restaurant.cuisine}</span>
                <span>⭐ {restaurant.rating}</span>
                <span>Table {tableNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {filteredMenu.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex space-x-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-lg font-bold text-red-600">${item.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                        {item.isVegetarian && (
                          <div className="text-green-600" title="Vegetarian">
                            <Leaf size={16} />
                          </div>
                        )}
                        {item.isVegan && (
                          <div className="text-green-600" title="Vegan">
                            <Leaf size={16} />
                          </div>
                        )}
                        {item.isGlutenFree && (
                          <div className="text-orange-600" title="Gluten Free">
                            <Wheat size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-3">
                    {cart[item.id] ? (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
                          {cart[item.id]}
                        </span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item.id)}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center"
                      >
                        <Plus size={16} className="mr-2" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {getCartItemCount() > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-bold">{getCartItemCount()}</div>
                  <div className="text-xs text-red-100">items</div>
                </div>
                <div className="h-8 w-px bg-red-400"></div>
                <div className="text-center">
                  <div className="text-lg font-bold">${getCartTotal().toFixed(2)}</div>
                  <div className="text-xs text-red-100">total</div>
                </div>
                <button
                  onClick={handleOrder}
                  className="bg-white text-red-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRMenu;