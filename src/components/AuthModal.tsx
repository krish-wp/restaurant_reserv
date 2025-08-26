import React, { useState } from 'react';
import { X, User, Store, Mail, Phone, Lock } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  userType: 'customer' | 'restaurant';
  onClose: () => void;
  onAuth: (userData: Partial<UserType>, type: 'customer' | 'restaurant', mode: 'login' | 'signup') => void;
  onSwitchMode: () => void;
  onSwitchType: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  mode,
  userType,
  onClose,
  onAuth,
  onSwitchMode,
  onSwitchType
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(formData, userType, mode);
    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mb-4">
              {userType === 'customer' ? (
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <User className="text-red-600" size={32} />
                </div>
              ) : (
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Store className="text-green-600" size={32} />
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {userType === 'customer' ? 'Start your dining journey' : 'Grow your restaurant business'}
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => onSwitchType()}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'customer'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={16} className="mr-2" />
              Customer
            </button>
            <button
              type="button"
              onClick={() => onSwitchType()}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'restaurant'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Store size={16} className="mr-2" />
              Restaurant
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder={userType === 'customer' ? 'Your full name' : 'Restaurant name'}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            {mode === 'signup' && (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
            )}
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            {mode === 'signup' && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
            )}
            
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                userType === 'customer'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={onSwitchMode}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              {mode === 'login' 
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;