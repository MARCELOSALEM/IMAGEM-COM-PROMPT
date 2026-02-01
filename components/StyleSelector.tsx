
import React from 'react';
import { ART_STYLES } from '../constants';
import { StyleOption } from '../types';

interface StyleSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider block">
        1. Selecione um Estilo
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ART_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              selectedId === style.id
                ? 'border-blue-500 ring-2 ring-blue-500/20 ring-offset-2 ring-offset-slate-900'
                : 'border-slate-800 hover:border-slate-600'
            }`}
          >
            <div className="aspect-square relative">
              <img
                src={style.image}
                alt={style.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  selectedId === style.id ? 'scale-110' : 'group-hover:scale-110'
                }`}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-2 text-left transition-opacity ${
                 selectedId === style.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
              }`}>
                <span className="text-xs font-bold text-white leading-tight">{style.name}</span>
              </div>
            </div>
            {selectedId === style.id && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
