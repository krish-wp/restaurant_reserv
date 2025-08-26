import React, { useState } from 'react';
import { Restaurant, User, Reservation } from '../types';
import { Calendar, Clock, Users, ArrowLeft, Check } from 'lucide-react';

interface ReservationFlowProps {
  restaurant: Restaurant;
  user: User | null;
  onReserve: (reservationData: Partial<Reservation>) => void;
  onBack: () => void;
}

const ReservationFlow: React.FC<ReservationFlowProps> = ({
  restaurant,
  user,
  onReserve,
  onBack
}) => {
  const [step, setStep] = useState(1);
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const today = new Date().toISOString().split('T')[0];
  
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleConfirm = () => {
    onReserve(reservationData);
  };

  const isStepComplete = () => {
    switch (step) {
      case 1: return reservationData.date !== '';
      case 2: return reservationData.time !== '';
      case 3: return reservationData.guests > 0;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </div>

        {/* Restaurant Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-2">{restaurant.cuisine} • {restaurant.priceRange}</p>
              <p className="text-gray-500 text-sm">{restaurant.address}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  stepNum <= step 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum < step ? <Check size={20} /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    stepNum < step ? 'bg-red-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Select Date</span>
            <span>Choose Time</span>
            <span>Party Size</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="mr-3 text-red-600" size={28} />
                Select Date
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 14 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  const dateStr = date.toISOString().split('T')[0];
                  const isSelected = reservationData.date === dateStr;
                  
                  return (
                    <button
                      key={dateStr}
                      onClick={() => setReservationData({ ...reservationData, date: dateStr })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-bold">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="mr-3 text-red-600" size={28} />
                Choose Time
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {timeSlots.map((time) => {
                  const isSelected = reservationData.time === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setReservationData({ ...reservationData, time })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                      }`}
                    >
                      <div className="font-semibold">{time}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="mr-3 text-red-600" size={28} />
                Party Size
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {guestOptions.map((guests) => {
                  const isSelected = reservationData.guests === guests;
                  return (
                    <button
                      key={guests}
                      onClick={() => setReservationData({ ...reservationData, guests })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                      }`}
                    >
                      <div className="text-lg font-bold">{guests}</div>
                      <div className="text-sm">guest{guests > 1 ? 's' : ''}</div>
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={reservationData.specialRequests}
                  onChange={(e) => setReservationData({ ...reservationData, specialRequests: e.target.value })}
                  placeholder="Any dietary restrictions, preferences, or special occasions..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Check className="mr-3 text-red-600" size={28} />
                Confirm Reservation
              </h2>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Reservation Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Restaurant:</span>
                        <span className="font-medium">{restaurant.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">
                          {new Date(reservationData.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{reservationData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Party Size:</span>
                        <span className="font-medium">{reservationData.guests} guests</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Customer Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{user?.name || 'Guest'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{user?.email || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{user?.phone || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {reservationData.specialRequests && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Special Requests:</h4>
                    <p className="text-gray-600">{reservationData.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm">
                  <strong>Please note:</strong> Your reservation will be confirmed by the restaurant within a few minutes. 
                  You'll receive a confirmation via email and SMS.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={!isStepComplete()}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Confirm Reservation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationFlow;