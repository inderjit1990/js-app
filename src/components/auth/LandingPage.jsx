import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Dashboard from '../dashboard/Dashboard';

const LandingPage = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');

  if (user) {
    return <Dashboard />;
  }

  if (currentPage === 'login') {
    return <LoginPage onBack={() => setCurrentPage('landing')} />;
  }

  if (currentPage === 'signup') {
    return <SignupPage onBack={() => setCurrentPage('landing')} />;
  }

  return (
   <div className="min-vh-100 bg-light" style={{ background: 'linear-gradient(135deg, #eff6ff, #e0e7ff)' }}>
    {/* Navbar */}
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <span className="navbar-brand fw-bold text-primary fs-3">
          YourApp
        </span>

        <div className="d-flex gap-2">
          <button
            onClick={() => setCurrentPage('login')}
            className="btn btn-link text-primary fw-medium text-decoration-none"
          >
            Login
          </button>
          <button
            onClick={() => setCurrentPage('signup')}
            className="btn btn-primary fw-medium px-4"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>

    {/* Hero Section */}
    <div className="container py-5 mt-5">
      <div className="text-center">
        <h1 className="display-4 fw-bold text-dark mb-4">
          Welcome to YourApp
        </h1>

        <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '700px' }}>
          The best platform to manage your tasks and boost productivity.
          Get started today and transform the way you work.
        </p>

        <button
          onClick={() => setCurrentPage('signup')}
          className="btn btn-primary btn-lg px-5 shadow"
        >
          Get Started Free
        </button>
      </div>

      {/* Features */}
      <div className="row mt-5 pt-4 g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm text-center border-0">
            <div className="card-body">
              <div className="fs-1 mb-3">🚀</div>
              <h5 className="card-title fw-semibold">Fast & Efficient</h5>
              <p className="card-text text-muted">
                Lightning-fast performance for all your needs
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm text-center border-0">
            <div className="card-body">
              <div className="fs-1 mb-3">🔒</div>
              <h5 className="card-title fw-semibold">Secure</h5>
              <p className="card-text text-muted">
                Your data is safe with enterprise-grade security
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm text-center border-0">
            <div className="card-body">
              <div className="fs-1 mb-3">💡</div>
              <h5 className="card-title fw-semibold">Easy to Use</h5>
              <p className="card-text text-muted">
                Intuitive interface that anyone can master
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};

export default LandingPage;