
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center space-y-2">
      <h1 className="text-5xl font-extrabold tracking-tight gradient-text">
        ArtFlow Studio
      </h1>
      <p className="text-slate-400 text-lg max-w-lg mx-auto">
        Transforme suas ideias em obras de arte digitais com a inteligência do Gemini.
      </p>
    </header>
  );
};

export default Header;
