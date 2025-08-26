import React from 'react';
import { Restaurant } from '../types';
import { Star, MapPin, Clock, Users, QrCode } from 'lucide-react';

interface LandingProps {
  restaurants: Restaurant[];
  onAuthClick: (mode: 'login' | 'signup', type: 'customer' | 'restaurant') => void;
  onReserveClick: (restaurant: Restaurant) => void;
  onQRScan: (restaurant: Restaurant, table: string) => void;
}

const Landing: React.FC<LandingProps> = ({ restaurants, onAuthClick, onReserveClick, onQRScan }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              ReserveEats
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Discover exceptional dining experiences. Book tables instantly, order with QR codes, and enjoy seamless restaurant experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onAuthClick('signup', 'customer')}
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Dining
              </button>
              <button
                onClick={() => onAuthClick('signup', 'restaurant')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transform hover:scale-105 transition-all duration-200"
              >
                List Your Restaurant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ReserveEats?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of dining with our innovative reservation and ordering system
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-all duration-300">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Reservations</h3>
              <p className="text-gray-600">
                Book your table in seconds with real-time availability and instant confirmation
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-all duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">QR Code Ordering</h3>
              <p className="text-gray-600">
                Scan, browse menus, and order directly from your table for a contactless experience
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Experience</h3>
              <p className="text-gray-600">
                Enjoy curated dining experiences with top-rated restaurants and exclusive offers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Restaurants</h2>
            <p className="text-xl text-gray-600">
              Discover amazing dining experiences at our partner restaurants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="font-semibold text-sm">{restaurant.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{restaurant.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{restaurant.address.split(',')[1]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{restaurant.openHours.split(' - ')[0]}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium bg-red-100 text-red-700 px-3 py-1 rounded-full">
                        {restaurant.cuisine}
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        {restaurant.priceRange}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => onReserveClick(restaurant)}
                      className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                    >
                      Reserve Table
                    </button>
                    <button
                      onClick={() => onQRScan(restaurant, '1')}
                      className="px-4 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200"
                      title="Try QR Menu"
                    >
                      <QrCode size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Dining Experience?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of food lovers who trust ReserveEats for their restaurant reservations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onAuthClick('login', 'customer')}
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
            >
              Sign In
            </button>
            <button
              onClick={() => onAuthClick('signup', 'customer')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transform hover:scale-105 transition-all duration-200"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;