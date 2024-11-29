import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Map, MessageCircle, Palette, User, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import ThemeToggle from './ThemeToggle';
import { cn } from '../lib/utils';

export default function Navigation() {
  const currentUser = useStore((state) => state.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-secondary border-b border-border relative">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mascot Logo and Brand Name */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.postimg.cc/RVwfGpR7/masclogo.png" // Replace with the actual path to the mascot logo
            alt="EcoCommunity Mascot"
            className="w-10 h-10"
          />
          <div className="text-xl font-bold text-primary">EcoLLama</div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-primary sm:hidden focus:outline-none"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 transition-colors text-sm',
                isActive ? 'text-primary' : 'text-foreground hover:text-primary'
              )
            }
          >
            <Map className="w-5 h-5" />
            <span>Mappa</span>
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 transition-colors text-sm',
                isActive ? 'text-primary' : 'text-foreground hover:text-primary'
              )
            }
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat</span>
          </NavLink>
          <NavLink
            to="/recycling-art"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 transition-colors text-sm',
                isActive ? 'text-primary' : 'text-foreground hover:text-primary'
              )
            }
          >
            <Palette className="w-5 h-5" />
            <span>Arte Riciclata</span>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 transition-colors text-sm',
                isActive ? 'text-primary' : 'text-foreground hover:text-primary'
              )
            }
          >
            <User className="w-5 h-5" />
            <span>{currentUser?.username || 'Profilo'}</span>
          </NavLink>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div
        className="fixed inset-0 bg-secondary bg-opacity-95 z-[9999] flex flex-col items-center gap-6 py-8 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 text-lg transition-colors',
                isActive ? 'text-primary' : 'text-foreground hover:text-primary'
              )
            }
          >
            <Map className="w-6 h-6" />
            <span>Mappa</span>
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 text-lg transition-colors',
                isActive ? 'text-primary' : 'text-foreground hover:text-primary'
              )
            }
          >
            <MessageCircle className="w-6 h-6" />
            <span>Chat</span>
          </NavLink>
          <NavLink
            to="/recycling-art"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 text-lg transition-colors',
                isActive ? 'text-primary' : 'text-foreground hover:text-primary'
              )
            }
          >
            <Palette className="w-6 h-6" />
            <span>Arte Riciclata</span>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 text-lg transition-colors',
                isActive ? 'text-primary' : 'text-foreground hover:text-primary'
              )
            }
          >
            <User className="w-6 h-6" />
            <span>{currentUser?.username || 'Profilo'}</span>
          </NavLink>
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
