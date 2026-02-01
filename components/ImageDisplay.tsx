
import React from 'react';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  statusText: string;
  error: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, statusText, error }) => {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `artflow-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className={`relative aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-slate-800 border-2 border-slate-700 shadow-2xl flex items-center justify-center ${isLoading ? 'ring-2 ring-blue-500/50 ring-offset-4 ring-offset-slate-900 transition-all duration-500' : ''}`}>
        {isLoading ? (
          <div className="flex flex-col items-center space-y-6 p-8 text-center">
            <div className="relative">
                <div className="animate-spin h-16 w-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full" />
                <div className="absolute inset-0 animate-pulse flex items-center justify-center">
                    <div className="h-6 w-6 bg-purple-500 rounded-full blur-md opacity-50" />
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-white font-bold text-lg tracking-wide uppercase">{statusText}</p>
                <p className="text-slate-500 text-xs animate-pulse">Aguarde, a mágica leva tempo...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-8 text-center space-y-2">
            <div className="mx-auto w-12 h-12 text-red-500 opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="Generated Art"
            className="w-full h-full object-cover transition-opacity duration-1000 opacity-100"
          />
        ) : (
          <div className="p-8 text-center space-y-4 opacity-30">
             <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            <p className="text-slate-400 text-sm font-medium">Sua obra aparecerá aqui após o refinamento.</p>
          </div>
        )}
      </div>

      {imageUrl && !isLoading && (
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/20 transition-all transform hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span>Baixar Resultado Final</span>
        </button>
      )}
    </div>
  );
};

export default ImageDisplay;
