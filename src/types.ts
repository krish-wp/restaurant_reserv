export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'restaurant';
  loyaltyPoints?: number;
  restaurantId?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  rating: number;
  priceRange: string;
  openHours: string;
  capacity: number;
  menu: MenuItem[];
  tables: Table[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  qrCode: string;
}

export interface Reservation {
  id: string;
  customerId: string;
  customerName: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests?: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  tableNumber: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served';
  total: number;
  timestamp: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}