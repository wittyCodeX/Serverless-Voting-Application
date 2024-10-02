import React from 'react';

const LanguageCard = ({ language, handleVote }) => {
  return (
    <div
      key={language.language}
      className="min-h-80 gap-6 flex items-center justify-center"
    >
      <div className="bg-gray-100 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
        <div className="flex items-center gap-4">
          <img src={language.image}
            alt={language.language}
            className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover transition-all duration-500 delay-500 transform"
          />
          <div className="w-fit transition-all transform duration-500">
            <h1 className="text-gray-600 font-bold">
              {language.language}
            </h1>
            <a
              href={language.documentation_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:underline hover:text-black"
            >
              View Reference
            </a>
            <a className="block text-xs text-gray-500 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500 mt-2" >
              {language.total_votes} Votes
            </a>
          </div>
        </div>
        <button
          onClick={() => handleVote(language.language)}
          className="absolute bottom-1 right-1 bg-gray-500 rounded-xl p-1 w-20 h-9 duration-500 hover:bg-gray-700 transition-all group-hover:right-1 opacity-0 group-hover:opacity-100 text-white flex items-center justify-center"
        >
          +1
        </button>
      </div>
    </div>
  );
};

export default LanguageCard;
