import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import { useThemeStore } from './store/useThemeStore';
import Navigation from './components/Navigation';
import Map from './components/Map/Map';
import Chat from './components/Chat';
import RecyclingArt from './components/RecyclingArt';
import Profile from './components/Profile/Profile';
import LoginForm from './components/Auth/LoginForm';

function App() {
  const currentUser = useStore((state) => state.currentUser);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!currentUser) {
    return <LoginForm />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="w-full px-4 sm:px-6 lg:px-8 flex-1">
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/recycling-art" element={<RecyclingArt />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;