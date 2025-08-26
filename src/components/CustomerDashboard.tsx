import React from 'react';
import { User, Restaurant, Reservation } from '../types';
import { Calendar, Clock, Users, Star, MapPin, Gift } from 'lucide-react';

interface CustomerDashboardProps {
  user: User;
  reservations: Reservation[];
  restaurants: Restaurant[];
  onReserveClick: (restaurant: Restaurant) => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  user,
  reservations,
  restaurants,
  onReserveClick
}) => {
  const upcomingReservations = reservations.filter(r => r.status === 'confirmed' || r.status === 'pending');
  const pastReservations = reservations.filter(r => r.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-700 bg-green-100';
      case 'pending': return 'text-yellow-700 bg-yellow-100';
      case 'cancelled': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-red-100 text-lg">Ready for your next dining adventure?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Gift className="text-yellow-300" size={24} />
              <span className="text-2xl font-bold">{user.loyaltyPoints}</span>
            </div>
            <p className="text-red-100 text-sm">Loyalty Points</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Reservations */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Reservations</h2>
            {upcomingReservations.length > 0 ? (
              <div className="space-y-4">
                {upcomingReservations.map((reservation) => (
                  <div key={reservation.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {reservation.restaurantName}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-600 text-sm">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            {reservation.date}
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            {reservation.time}
                          </div>
                          <div className="flex items-center">
                            <Users size={16} className="mr-1" />
                            {reservation.guests} guests
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(reservation.status)}`}>
                        {reservation.status}
                      </span>
                    </div>
                    {reservation.specialRequests && (
                      <div className="bg-gray-50 rounded-lg p-3 mt-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Special requests:</span> {reservation.specialRequests}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-500 text-lg mb-4">No upcoming reservations</p>
                <p className="text-gray-400">Book your next table to see it here</p>
              </div>
            )}
          </div>

          {/* Featured Restaurants */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Discover New Restaurants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restaurants.slice(0, 4).map((restaurant) => (
                <div key={restaurant.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex space-x-4">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{restaurant.name}</h3>
                      <div className="flex items-center mt-1 mb-2">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="text-sm font-medium ml-1">{restaurant.rating}</span>
                        <span className="text-gray-400 text-sm ml-2">{restaurant.cuisine}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin size={14} className="mr-1" />
                        <span className="truncate">{restaurant.address.split(',')[1]}</span>
                      </div>
                      <button
                        onClick={() => onReserveClick(restaurant)}
                        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        Reserve Table
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Reservations</span>
                <span className="font-semibold">{reservations.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Restaurants Visited</span>
                <span className="font-semibold">{new Set(reservations.map(r => r.restaurantId)).size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Loyalty Points</span>
                <span className="font-semibold text-yellow-600">{user.loyaltyPoints}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {pastReservations.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Visits</h3>
              <div className="space-y-3">
                {pastReservations.slice(0, 3).map((reservation) => (
                  <div key={reservation.id} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {reservation.restaurantName}
                      </p>
                      <p className="text-xs text-gray-500">{reservation.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;