import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import SignupPage from './SignupPage';
import Dashboard from '../dashboard/Dashboard';

const LoginPage = ({ onBack }) => {
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  if (user) {
    return <Dashboard />;
  }

  if (currentPage === 'signup') {
    return <SignupPage onBack={() => setCurrentPage('login')} />;
  }

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    const result = await login({
      email: formData.identifier,
      password: formData.password,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center p-4 bg-light">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '28rem' }}>
        <div className="text-center mb-4">
          <h2 className="h3 fw-bold text-dark">Welcome Back</h2>
          <p className="text-muted">Sign in to your account</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form>
          <div className="mb-3">
            <label className="form-label">Email or Mobile</label>
            <input
              type="text"
              value={formData.identifier}
              onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
              className="form-control"
              placeholder="Enter email or mobile number"
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
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label text-muted">
                Remember me
              </label>
            </div>
            <button type="button" className="btn btn-link p-0 text-decoration-none">
              Forgot password?
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setCurrentPage('signup')}
              className="btn btn-link p-0 text-decoration-none"
            >
              Sign up
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

export default LoginPage;