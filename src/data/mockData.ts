import { Restaurant, Reservation, Order } from '../types';

export const mockData = {
  restaurants: [
    {
      id: '1',
      name: 'Bella Vista',
      description: 'Authentic Italian cuisine with a modern twist, featuring fresh pasta made daily and wood-fired pizzas.',
      cuisine: 'Italian',
      address: '123 Main Street, Downtown',
      phone: '+1 (555) 123-4567',
      email: 'reservations@bellavista.com',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      rating: 4.8,
      priceRange: '$$-$$$',
      openHours: '11:00 AM - 10:00 PM',
      capacity: 80,
      menu: [
        {
          id: '1',
          name: 'Margherita Pizza',
          description: 'Traditional pizza with fresh tomatoes, mozzarella, and basil',
          price: 18.99,
          category: 'Pizza',
          image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
          isVegetarian: true
        },
        {
          id: '2',
          name: 'Spaghetti Carbonara',
          description: 'Classic Roman pasta with eggs, cheese, pancetta, and pepper',
          price: 22.99,
          category: 'Pasta',
          image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg'
        },
        {
          id: '3',
          name: 'Grilled Salmon',
          description: 'Fresh Atlantic salmon with herbs and lemon butter',
          price: 28.99,
          category: 'Seafood',
          image: 'https://images.pexels.com/photos/725990/pexels-photo-725990.jpeg'
        },
        {
          id: '4',
          name: 'Caesar Salad',
          description: 'Crisp romaine lettuce with parmesan cheese and croutons',
          price: 14.99,
          category: 'Salads',
          image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',
          isVegetarian: true
        },
        {
          id: '5',
          name: 'Tiramisu',
          description: 'Classic Italian dessert with coffee-soaked ladyfingers',
          price: 9.99,
          category: 'Desserts',
          image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg',
          isVegetarian: true
        }
      ],
      tables: [
        { id: '1', number: '1', capacity: 2, qrCode: 'bella-vista-table-1' },
        { id: '2', number: '2', capacity: 4, qrCode: 'bella-vista-table-2' },
        { id: '3', number: '3', capacity: 6, qrCode: 'bella-vista-table-3' },
        { id: '4', number: '4', capacity: 2, qrCode: 'bella-vista-table-4' },
        { id: '5', number: '5', capacity: 4, qrCode: 'bella-vista-table-5' }
      ]
    },
    {
      id: '2',
      name: 'Sakura Sushi',
      description: 'Premium Japanese dining experience with fresh sashimi, handcrafted sushi rolls, and traditional hot dishes.',
      cuisine: 'Japanese',
      address: '456 Oak Avenue, Midtown',
      phone: '+1 (555) 987-6543',
      email: 'hello@sakurasushi.com',
      image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
      rating: 4.9,
      priceRange: '$$$-$$$$',
      openHours: '5:00 PM - 11:00 PM',
      capacity: 60,
      menu: [
        {
          id: '6',
          name: 'Dragon Roll',
          description: 'Shrimp tempura, avocado, cucumber topped with eel and avocado',
          price: 16.99,
          category: 'Sushi Rolls',
          image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg'
        },
        {
          id: '7',
          name: 'Chirashi Bowl',
          description: 'Assorted fresh sashimi over seasoned sushi rice',
          price: 24.99,
          category: 'Bowls',
          image: 'https://images.pexels.com/photos/8951104/pexels-photo-8951104.jpeg'
        },
        {
          id: '8',
          name: 'Miso Soup',
          description: 'Traditional Japanese soup with tofu and seaweed',
          price: 4.99,
          category: 'Soups',
          image: 'https://images.pexels.com/photos/5848612/pexels-photo-5848612.jpeg',
          isVegetarian: true
        }
      ],
      tables: [
        { id: '1', number: '1', capacity: 2, qrCode: 'sakura-sushi-table-1' },
        { id: '2', number: '2', capacity: 4, qrCode: 'sakura-sushi-table-2' },
        { id: '3', number: '3', capacity: 6, qrCode: 'sakura-sushi-table-3' }
      ]
    },
    {
      id: '3',
      name: 'The Garden Bistro',
      description: 'Farm-to-table dining with seasonal menus, organic ingredients, and a cozy outdoor patio perfect for any occasion.',
      cuisine: 'American',
      address: '789 Pine Street, Garden District',
      phone: '+1 (555) 456-7890',
      email: 'info@gardenbistro.com',
      image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
      rating: 4.6,
      priceRange: '$$-$$$',
      openHours: '10:00 AM - 9:00 PM',
      capacity: 120,
      menu: [
        {
          id: '9',
          name: 'Avocado Toast',
          description: 'Multi-grain bread topped with smashed avocado and herbs',
          price: 12.99,
          category: 'Breakfast',
          image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg',
          isVegan: true
        },
        {
          id: '10',
          name: 'Quinoa Power Bowl',
          description: 'Nutrient-packed bowl with quinoa, roasted vegetables, and tahini',
          price: 16.99,
          category: 'Bowls',
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
          isVegan: true
        }
      ],
      tables: [
        { id: '1', number: '1', capacity: 2, qrCode: 'garden-bistro-table-1' },
        { id: '2', number: '2', capacity: 4, qrCode: 'garden-bistro-table-2' }
      ]
    }
  ] as Restaurant[],

  reservations: [
    {
      id: '1',
      customerId: '1',
      customerName: 'John Doe',
      restaurantId: '1',
      restaurantName: 'Bella Vista',
      date: '2024-12-20',
      time: '7:30 PM',
      guests: 2,
      status: 'confirmed' as const,
      specialRequests: 'Window table preferred'
    },
    {
      id: '2',
      customerId: '2',
      customerName: 'Jane Smith',
      restaurantId: '2',
      restaurantName: 'Sakura Sushi',
      date: '2024-12-22',
      time: '8:00 PM',
      guests: 4,
      status: 'pending' as const
    }
  ] as Reservation[],

  orders: [
    {
      id: '1',
      restaurantId: '1',
      tableNumber: '3',
      items: [
        { menuItemId: '1', name: 'Margherita Pizza', price: 18.99, quantity: 2 },
        { menuItemId: '2', name: 'Spaghetti Carbonara', price: 22.99, quantity: 1 }
      ],
      status: 'preparing' as const,
      total: 60.97,
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      restaurantId: '1',
      tableNumber: '5',
      items: [
        { menuItemId: '4', name: 'Caesar Salad', price: 14.99, quantity: 1 },
        { menuItemId: '5', name: 'Tiramisu', price: 9.99, quantity: 2 }
      ],
      status: 'ready' as const,
      total: 34.97,
      timestamp: new Date().toISOString()
    }
  ] as Order[]
};