import { AuthProvider } from './context/AuthContext';
import LandingPage from './components/auth/LandingPage';

function App() {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
}

export default App;