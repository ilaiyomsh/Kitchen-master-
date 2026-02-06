import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="text-lg text-gray-600 mt-4">Page not found</p>
        <p className="text-sm text-gray-400 mt-1">
          Scan a table QR code or go to the kitchen dashboard
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate('/kitchen/login')}>
            Kitchen Login
          </Button>
        </div>
      </div>
    </div>
  );
}
