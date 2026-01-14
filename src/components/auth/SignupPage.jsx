import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginPage from './LoginPage';
import Dashboard from '../dashboard/Dashboard';

const SignupPage = ({ onBack }) => {
  const { signup, user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('signup');

  if (user) {
    return <Dashboard />;
  }

  if (currentPage === 'login') {
    return <LoginPage onBack={onBack} />;
  }

  const handleSubmit = async () => {
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await signup({
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => setCurrentPage('login'), 2000);
    } else {
      setError(result.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center p-4 bg-light">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '28rem' }}>
        <div className="text-center mb-4">
          <h2 className="h3 fw-bold text-dark">Create Account</h2>
          <p className="text-muted">Join us today</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            Account created successfully! Redirecting to login...
          </div>
        )}

        <form>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="form-control"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="form-control"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="form-control"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setCurrentPage('login')}
              className="btn btn-link p-0 text-decoration-none"
            >
              Sign in
            </button>
          </p>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="btn btn-link"
            >
              ← Back to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;