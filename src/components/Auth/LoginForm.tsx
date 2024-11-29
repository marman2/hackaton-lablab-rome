import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { LogIn } from 'lucide-react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const login = useStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Accedi a EcoLLama
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nome utente
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Inserisci il tuo nome utente"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            <span className="inline-flex items-center justify-center">
              <LogIn className="h-5 w-5 mr-2" />
              Accedi
            </span>
          </button>
        </form>
        <div className="mt-5 flex justify-center">
          <img
            src="https://i.postimg.cc/yxbR52Gj/masc1.png" // Replace with the correct path for your image
            alt="Eco Llama Mascot"
            className="w-[180px] h-[200px]"
          />
        </div>
      </div>
    </div>
  );
}
