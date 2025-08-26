import React, { useState } from 'react';
import { Restaurant, Reservation, Order } from '../types';
import { Calendar, Clock, Users, DollarSign, TrendingUp, Bell, CheckCircle, XCircle, Eye } from 'lucide-react';

interface RestaurantDashboardProps {
  restaurant: Restaurant;
  reservations: Reservation[];
  orders: Order[];
  onUpdateReservation: (id: string, status: Reservation['status']) => void;
  onUpdateOrder: (id: string, status: Order['status']) => void;
}

const RestaurantDashboard: React.FC<RestaurantDashboardProps> = ({
  restaurant,
  reservations,
  orders,
  onUpdateReservation,
  onUpdateOrder
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reservations' | 'orders'>('overview');

  const todayReservations = reservations.filter(r => r.date === new Date().toISOString().split('T')[0]);
  const pendingReservations = reservations.filter(r => r.status === 'pending');
  const activeOrders = orders.filter(o => ['pending', 'confirmed', 'preparing'].includes(o.status));
  const todayRevenue = orders.filter(o => o.timestamp.startsWith(new Date().toISOString().split('T')[0]))
    .reduce((sum, o) => sum + o.total, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-700 bg-green-100';
      case 'pending': return 'text-yellow-700 bg-yellow-100';
      case 'cancelled': return 'text-red-700 bg-red-100';
      case 'preparing': return 'text-blue-700 bg-blue-100';
      case 'ready': return 'text-purple-700 bg-purple-100';
      case 'served': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Restaurant Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-24 h-24 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
            <p className="text-gray-600 mb-2">{restaurant.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">{restaurant.cuisine}</span>
              <span>⭐ {restaurant.rating}</span>
              <span>📍 {restaurant.address.split(',')[1]}</span>
            </div>
          </div>
          {(pendingReservations.length > 0 || activeOrders.length > 0) && (
            <div className="flex items-center space-x-2 text-red-600">
              <Bell className="animate-pulse" size={24} />
              <span className="font-medium">
                {pendingReservations.length + activeOrders.length} pending
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today's Reservations</p>
              <p className="text-2xl font-bold text-gray-900">{todayReservations.length}</p>
            </div>
            <Calendar className="text-red-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Orders</p>
              <p className="text-2xl font-bold text-gray-900">{activeOrders.length}</p>
            </div>
            <Clock className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${todayRevenue.toFixed(2)}</p>
            </div>
            <DollarSign className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Occupancy Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((todayReservations.length / restaurant.capacity) * 100)}%
              </p>
            </div>
            <TrendingUp className="text-purple-600" size={32} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'reservations', label: `Reservations (${reservations.length})` },
              { key: 'orders', label: `Orders (${orders.length})` }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Pending Actions */}
              {(pendingReservations.length > 0 || activeOrders.length > 0) && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Pending Actions</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {pendingReservations.slice(0, 3).map((reservation) => (
                      <div key={reservation.id} className="border border-yellow-200 rounded-xl p-4 bg-yellow-50">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{reservation.customerName}</h4>
                            <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                              <span>{reservation.date} at {reservation.time}</span>
                              <span>{reservation.guests} guests</span>
                            </div>
                          </div>
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                            Pending
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onUpdateReservation(reservation.id, 'confirmed')}
                            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => onUpdateReservation(reservation.id, 'cancelled')}
                            className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {activeOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="border border-blue-200 rounded-xl p-4 bg-blue-50">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">Table {order.tableNumber}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {order.items.length} items • ${order.total.toFixed(2)}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => onUpdateOrder(order.id, 'confirmed')}
                              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                              Confirm
                            </button>
                          )}
                          {order.status === 'confirmed' && (
                            <button
                              onClick={() => onUpdateOrder(order.id, 'preparing')}
                              className="flex-1 bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                            >
                              Start Preparing
                            </button>
                          )}
                          {order.status === 'preparing' && (
                            <button
                              onClick={() => onUpdateOrder(order.id, 'ready')}
                              className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                            >
                              Mark Ready
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[...reservations.slice(0, 3), ...orders.slice(0, 2)].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {'customerName' in item 
                            ? `Reservation by ${item.customerName}`
                            : `Order from Table ${item.tableNumber}`
                          }
                        </p>
                        <p className="text-xs text-gray-500">
                          {'date' in item ? item.date : new Date(item.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">All Reservations</h3>
              {reservations.length > 0 ? (
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{reservation.customerName}</h4>
                          <div className="flex items-center space-x-4 text-gray-600 text-sm mt-2">
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
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(reservation.status)}`}>
                            {reservation.status}
                          </span>
                          {reservation.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => onUpdateReservation(reservation.id, 'confirmed')}
                                className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-colors"
                                title="Confirm"
                              >
                                <CheckCircle size={20} />
                              </button>
                              <button
                                onClick={() => onUpdateReservation(reservation.id, 'cancelled')}
                                className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                title="Cancel"
                              >
                                <XCircle size={20} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {reservation.specialRequests && (
                        <div className="bg-gray-50 rounded-lg p-3">
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
                  <p className="text-gray-500 text-lg">No reservations yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">All Orders</h3>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">Table {order.tableNumber}</h4>
                          <p className="text-gray-600 mt-1">
                            {new Date(order.timestamp).toLocaleString()} • ${order.total.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          {['pending', 'confirmed', 'preparing'].includes(order.status) && (
                            <div className="flex space-x-2">
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => onUpdateOrder(order.id, 'confirmed')}
                                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                >
                                  Confirm
                                </button>
                              )}
                              {order.status === 'confirmed' && (
                                <button
                                  onClick={() => onUpdateOrder(order.id, 'preparing')}
                                  className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition-colors"
                                >
                                  Preparing
                                </button>
                              )}
                              {order.status === 'preparing' && (
                                <button
                                  onClick={() => onUpdateOrder(order.id, 'ready')}
                                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                                >
                                  Ready
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Order Items:</h5>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.quantity}x {item.name}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Eye className="mx-auto text-gray-400 mb-4" size={64} />
                  <p className="text-gray-500 text-lg">No orders yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;