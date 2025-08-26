import React from 'react';
import { User, LogOut, Calendar, Store } from 'lucide-react';
import { User as UserType } from '../types';

interface NavigationProps {
  user: UserType;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600">ReserveEats</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              {user.type === 'customer' ? (
                <Calendar className="text-red-600" size={20} />
              ) : (
                <Store className="text-red-600" size={20} />
              )}
              <span className="font-medium">{user.name}</span>
              {user.type === 'customer' && user.loyaltyPoints !== undefined && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  {user.loyaltyPoints} pts
                </span>
              )}
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;