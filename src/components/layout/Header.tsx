import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase as BriefcaseBusiness, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-blue-700 font-bold text-xl"
        >
          <BriefcaseBusiness className="h-6 w-6" />
          <span>JobBoard</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/jobs" className="text-gray-600 hover:text-blue-700 transition-colors font-medium">
            Browse Jobs
          </Link>
          
          {currentUser?.role === 'employer' && (
            <Link to="/employer/dashboard" className="text-gray-600 hover:text-blue-700 transition-colors font-medium">
              Employer Dashboard
            </Link>
          )}
          
          {currentUser?.role === 'admin' && (
            <Link to="/admin/dashboard" className="text-gray-600 hover:text-blue-700 transition-colors font-medium">
              Admin Dashboard
            </Link>
          )}

          {!currentUser ? (
            <div className="flex space-x-3">
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-md text-blue-700 hover:bg-blue-50 transition-colors font-medium"
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 transition-colors font-medium"
              >
                <User className="h-5 w-5" />
                <span>{currentUser.name}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-700 transition-colors font-medium"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 hover:text-blue-700 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/jobs" 
              className="text-gray-600 hover:text-blue-700 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Jobs
            </Link>
            
            {currentUser?.role === 'employer' && (
              <Link 
                to="/employer/dashboard" 
                className="text-gray-600 hover:text-blue-700 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Employer Dashboard
              </Link>
            )}
            
            {currentUser?.role === 'admin' && (
              <Link 
                to="/admin/dashboard" 
                className="text-gray-600 hover:text-blue-700 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}

            {!currentUser ? (
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md text-blue-700 hover:bg-blue-50 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>{currentUser.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-700 transition-colors font-medium py-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;