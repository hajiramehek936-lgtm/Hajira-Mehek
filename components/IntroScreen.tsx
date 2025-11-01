
import React from 'react';
import { SparklesIcon, ChevronRightIcon } from './icons';

interface IntroScreenProps {
  onNavigateToChat: () => void;
}

const ImpactPoint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start space-x-3">
    <div className="flex-shrink-0">
      <SparklesIcon className="w-6 h-6 text-amber-500" />
    </div>
    <p className="text-gray-700 dark:text-gray-300 text-lg">{children}</p>
  </li>
);

const IntroScreen: React.FC<IntroScreenProps> = ({ onNavigateToChat }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{backgroundImage: "url('https://picsum.photos/1600/1200?grayscale&blur=2')"}}
      ></div>
      <div className="absolute inset-0 bg-gray-100/70 dark:bg-gray-900/80 z-10"></div>
      
      <div className="relative z-20 max-w-4xl w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 sm:p-12 text-center transform transition-all hover:scale-[1.01] duration-300">
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            The Vision of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Basavanna</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            A 12th-century philosopher and social reformer who reshaped Karnataka's society.
          </p>
        </header>

        <main className="text-left mb-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">Key Societal Impacts:</h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
            <ImpactPoint>
              Promoted radical equality and sought to abolish caste barriers, advocating for one human family.
            </ImpactPoint>
            <ImpactPoint>
              Empowered women and common people through the <span className="font-semibold">Anubhava Mantapa</span>, a pioneering spiritual and social parliament.
            </ImpactPoint>
            <ImpactPoint>
              Championed the dignity of labour through <span className="font-semibold">"Kayaka"</span> (work is worship) and selfless service via <span className="font-semibold">"Dasoha"</span> (communal sharing).
            </ImpactPoint>
            <ImpactPoint>
              Inspired countless social and spiritual movements, leaving a timeless legacy on Karnataka.
            </ImpactPoint>
          </ul>
        </main>

        <footer >
          <button
            onClick={onNavigateToChat}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-800"
          >
            Ask About His Legacy
            <ChevronRightIcon className="w-6 h-6 ml-2" />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default IntroScreen;
