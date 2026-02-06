import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKitchenStore } from '../stores/kitchen.store';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function KitchenLogin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const setStorePin = useKitchenStore((s) => s.setPin);
  const setAuthenticated = useKitchenStore((s) => s.setAuthenticated);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError('Please enter the kitchen PIN');
      return;
    }
    setStorePin(pin);
    setAuthenticated(true);
    navigate('/kitchen');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Kitchen Access
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Kitchen PIN
            </label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="****"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <Button type="submit" className="w-full">
            Enter Kitchen
          </Button>
        </form>
      </Card>
    </div>
  );
}
