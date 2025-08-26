import React, { useState, useEffect } from 'react';
import { User, Restaurant, Reservation, MenuItem, Order } from './types';
import { mockData } from './data/mockData';
import Landing from './components/Landing';
import AuthModal from './components/AuthModal';
import CustomerDashboard from './components/CustomerDashboard';
import RestaurantDashboard from './components/RestaurantDashboard';
import ReservationFlow from './components/ReservationFlow';
import QRMenu from './components/QRMenu';
import Navigation from './components/Navigation';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'customer' | 'restaurant'>('customer');
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'reservation' | 'qr-menu'>('landing');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [tableNumber, setTableNumber] = useState<string>('');

  // Mock data state
  const [restaurants] = useState<Restaurant[]>(mockData.restaurants);
  const [reservations, setReservations] = useState<Reservation[]>(mockData.reservations);
  const [orders, setOrders] = useState<Order[]>(mockData.orders);

  useEffect(() => {
    // Check for QR code parameters in URL
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('restaurant');
    const table = urlParams.get('table');
    
    if (restaurantId && table) {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      if (restaurant) {
        setSelectedRestaurant(restaurant);
        setTableNumber(table);
        setCurrentView('qr-menu');
      }
    }
  }, [restaurants]);

  const handleAuth = (userData: Partial<User>, type: 'customer' | 'restaurant', mode: 'login' | 'signup') => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      type,
      loyaltyPoints: type === 'customer' ? 0 : undefined,
      restaurantId: type === 'restaurant' ? '1' : undefined
    };
    setUser(newUser);
    setShowAuth(false);
    setCurrentView('dashboard');
  };

  const handleReservation = (reservationData: Partial<Reservation>) => {
    const newReservation: Reservation = {
      id: Date.now().toString(),
      customerId: user?.id || '',
      customerName: user?.name || '',
      restaurantId: selectedRestaurant?.id || '',
      restaurantName: selectedRestaurant?.name || '',
      date: reservationData.date || '',
      time: reservationData.time || '',
      guests: reservationData.guests || 2,
      status: 'confirmed',
      specialRequests: reservationData.specialRequests || ''
    };
    setReservations([...reservations, newReservation]);
    setCurrentView('dashboard');
  };

  const handleOrder = (orderData: { items: { id: string; quantity: number }[] }) => {
    const orderItems = orderData.items.map(item => {
      const menuItem = selectedRestaurant?.menu.find(m => m.id === item.id);
      return {
        menuItemId: item.id,
        name: menuItem?.name || '',
        price: menuItem?.price || 0,
        quantity: item.quantity
      };
    });

    const newOrder: Order = {
      id: Date.now().toString(),
      restaurantId: selectedRestaurant?.id || '',
      tableNumber,
      items: orderItems,
      status: 'pending',
      total: orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      timestamp: new Date().toISOString()
    };

    setOrders([...orders, newOrder]);
  };

  const startReservation = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('reservation');
  };

  const openQRMenu = (restaurant: Restaurant, table: string) => {
    setSelectedRestaurant(restaurant);
    setTableNumber(table);
    setCurrentView('qr-menu');
  };

  if (currentView === 'qr-menu' && selectedRestaurant) {
    return (
      <QRMenu
        restaurant={selectedRestaurant}
        tableNumber={tableNumber}
        onOrder={handleOrder}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <Navigation
          user={user}
          onLogout={() => {
            setUser(null);
            setCurrentView('landing');
          }}
        />
      )}

      {currentView === 'landing' && (
        <Landing
          restaurants={restaurants}
          onAuthClick={(mode, type) => {
            setAuthMode(mode);
            setUserType(type);
            setShowAuth(true);
          }}
          onReserveClick={startReservation}
          onQRScan={openQRMenu}
        />
      )}

      {currentView === 'dashboard' && user?.type === 'customer' && (
        <CustomerDashboard
          user={user}
          reservations={reservations.filter(r => r.customerId === user.id)}
          restaurants={restaurants}
          onReserveClick={startReservation}
        />
      )}

      {currentView === 'dashboard' && user?.type === 'restaurant' && (
        <RestaurantDashboard
          restaurant={restaurants.find(r => r.id === user.restaurantId) || restaurants[0]}
          reservations={reservations.filter(r => r.restaurantId === user.restaurantId)}
          orders={orders.filter(o => o.restaurantId === user.restaurantId)}
          onUpdateReservation={(id, status) => {
            setReservations(reservations.map(r => 
              r.id === id ? { ...r, status } : r
            ));
          }}
          onUpdateOrder={(id, status) => {
            setOrders(orders.map(o => 
              o.id === id ? { ...o, status } : o
            ));
          }}
        />
      )}

      {currentView === 'reservation' && selectedRestaurant && (
        <ReservationFlow
          restaurant={selectedRestaurant}
          user={user}
          onReserve={handleReservation}
          onBack={() => setCurrentView(user ? 'dashboard' : 'landing')}
        />
      )}

      <AuthModal
        isOpen={showAuth}
        mode={authMode}
        userType={userType}
        onClose={() => setShowAuth(false)}
        onAuth={handleAuth}
        onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        onSwitchType={() => setUserType(userType === 'customer' ? 'restaurant' : 'customer')}
      />
    </div>
  );
}

export default App;