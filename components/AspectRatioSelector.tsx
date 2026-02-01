
import React from 'react';
import { ASPECT_RATIOS } from '../constants';

interface AspectRatioSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider block">
        2. Escolha a Proporção
      </label>
      <div className="flex flex-wrap gap-2">
        {ASPECT_RATIOS.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
              selectedId === option.id
                ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 fill-current ${selectedId === option.id ? 'text-blue-400' : 'text-slate-500'}`}
            >
              <path d={option.icon} />
            </svg>
            <span className="text-xs font-bold">{option.label} ({option.ratio})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
