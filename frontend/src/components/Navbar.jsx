import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const user = useSelector(state => state.auth.user);
  const cartItems = useSelector(state => state.cart.items || []);
  const dispatch = useDispatch();

  const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded flex items-center justify-center font-bold">E</div>
              <span className="text-xl font-semibold text-emerald-700">E-Com Cart</span>
            </Link>
            <div className="hidden sm:block">
              <input
                aria-label="search"
                className="w-80 md:w-96 rounded-full border border-gray-200 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                placeholder="Search products, e.g. 'eggs'"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/cart" 
              className="relative inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
              </svg>
              <span className="hidden sm:inline">My Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">Hello, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800 text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-emerald-600 border border-emerald-600 px-3 py-1 rounded hover:bg-emerald-50 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition-colors">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;