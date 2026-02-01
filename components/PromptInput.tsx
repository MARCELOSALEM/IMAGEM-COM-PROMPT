
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onRefine: () => void;
  isRefining: boolean;
  refinedValue: string;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onRefine, isRefining, refinedValue }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          2. Descreva sua Ideia
        </label>
        <button
          onClick={onRefine}
          disabled={isRefining || !value.trim()}
          className="flex items-center space-x-2 text-xs font-bold text-purple-400 hover:text-purple-300 disabled:text-slate-600 transition-colors uppercase"
        >
          {isRefining ? (
             <div className="animate-spin h-3 w-3 border-2 border-purple-400 border-t-transparent rounded-full" />
          ) : (
            <span>✨ Refinar com Gemini</span>
          )}
        </button>
      </div>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ex: Um gato astronauta explorando os anéis de Saturno em estilo futurista..."
          className="w-full h-32 p-4 bg-slate-800 border-2 border-slate-700 rounded-2xl text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none custom-scrollbar"
        />
        {refinedValue && (
            <div className="mt-2 p-3 bg-purple-900/20 border border-purple-500/30 rounded-xl">
                <p className="text-[10px] font-bold text-purple-400 uppercase mb-1">Prompt Otimizado (English):</p>
                <p className="text-xs italic text-slate-400 leading-relaxed">{refinedValue}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default PromptInput;
