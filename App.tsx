
import React, { useState } from 'react';
import { GenerationState } from './types';
import { ART_STYLES, ASPECT_RATIOS } from './constants';
import { refinePromptWithGemini, generateImageWithGemini } from './services/geminiService';
import Header from './components/Header';
import StyleSelector from './components/StyleSelector';
import AspectRatioSelector from './components/AspectRatioSelector';
import PromptInput from './components/PromptInput';
import ImageDisplay from './components/ImageDisplay';

const App: React.FC = () => {
  const [state, setState] = useState<GenerationState & { generationStatus: string }>({
    originalPrompt: '',
    refinedPrompt: '',
    selectedStyle: ART_STYLES[0].id,
    selectedAspectRatio: ASPECT_RATIOS[0].id,
    isRefining: false,
    isGenerating: false,
    generationStatus: '',
    generatedImageUrl: null,
    error: null,
  });

  const handleRefineOnly = async () => {
    if (!state.originalPrompt.trim()) return;

    setState(prev => ({ ...prev, isRefining: true, error: null, refinedPrompt: '' }));
    try {
      const currentStyle = ART_STYLES.find(s => s.id === state.selectedStyle);
      const refined = await refinePromptWithGemini(
        state.originalPrompt, 
        currentStyle?.name || '', 
        currentStyle?.promptSuffix || ''
      );
      setState(prev => ({ ...prev, refinedPrompt: refined, isRefining: false }));
    } catch (err: any) {
      setState(prev => ({ ...prev, isRefining: false, error: err.message }));
    }
  };

  const handleGenerate = async () => {
    if (!state.originalPrompt.trim()) {
      setState(prev => ({ ...prev, error: "O que você tem em mente? Descreva para começar." }));
      return;
    }

    setState(prev => ({ 
        ...prev, 
        isGenerating: true, 
        error: null, 
        generatedImageUrl: null,
        generationStatus: 'Refinando sua ideia...'
    }));
    
    try {
      const currentStyle = ART_STYLES.find(s => s.id === state.selectedStyle);
      
      let promptToUse = state.refinedPrompt;
      if (!promptToUse) {
        promptToUse = await refinePromptWithGemini(
            state.originalPrompt, 
            currentStyle?.name || '', 
            currentStyle?.promptSuffix || ''
        );
        setState(prev => ({ ...prev, refinedPrompt: promptToUse, generationStatus: 'Gerando obra de arte...' }));
      } else {
        setState(prev => ({ ...prev, generationStatus: 'Gerando obra de arte...' }));
      }

      const imageUrl = await generateImageWithGemini(
        promptToUse, 
        currentStyle?.promptSuffix || '', 
        state.selectedAspectRatio
      );
      
      setState(prev => ({ 
        ...prev, 
        isGenerating: false, 
        generatedImageUrl: imageUrl,
        generationStatus: ''
      }));
    } catch (err: any) {
      setState(prev => ({ ...prev, isGenerating: false, generationStatus: '', error: err.message }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-4 custom-scrollbar overflow-x-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Coluna de Controles */}
        <div className="lg:col-span-7 space-y-10">
          <Header />
          
          <div className="bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-800/50 shadow-2xl space-y-8">
            <StyleSelector 
              selectedId={state.selectedStyle} 
              onSelect={(id) => setState(prev => ({ ...prev, selectedStyle: id, refinedPrompt: '' }))}
            />

            <AspectRatioSelector 
              selectedId={state.selectedAspectRatio}
              onSelect={(id) => setState(prev => ({ ...prev, selectedAspectRatio: id }))}
            />

            <PromptInput 
              value={state.originalPrompt}
              onChange={(val) => setState(prev => ({ ...prev, originalPrompt: val, refinedPrompt: '' }))}
              onRefine={handleRefineOnly}
              isRefining={state.isRefining}
              refinedValue={state.refinedPrompt}
            />

            <button
              onClick={handleGenerate}
              disabled={state.isGenerating || !state.originalPrompt.trim()}
              className="w-full relative py-5 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white font-extrabold text-xl rounded-2xl shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {state.isGenerating ? (
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="uppercase tracking-widest text-sm">{state.generationStatus}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>GERAR OBRA DE ARTE</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Coluna de Visualização */}
        <div className="lg:col-span-5 lg:sticky lg:top-8 self-start">
          <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-2xl h-fit">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Estúdio de Criação</h3>
                {state.generatedImageUrl && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">PRONTO</span>}
            </div>
            <ImageDisplay 
              imageUrl={state.generatedImageUrl} 
              isLoading={state.isGenerating} 
              statusText={state.generationStatus}
              error={state.error} 
            />
          </div>
          
          <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <p className="text-[10px] text-blue-400/60 leading-relaxed text-center">
              Dica: O refinamento automático traduz sua ideia para o inglês técnico de IA, garantindo que o modelo Imagen entenda exatamente cada detalhe de iluminação e composição.
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center space-y-2">
        <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em]">
          Powered by Gemini 3 Flash & Gemini 2.5 Flash Image
        </p>
        <div className="h-px w-12 bg-slate-800 mx-auto" />
      </footer>
    </div>
  );
};

export default App;
