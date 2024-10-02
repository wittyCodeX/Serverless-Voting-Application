import './App.css';
import React, { useState, useEffect } from 'react';
import LanguageCard from './components/LanguageCard';
import { GET_LANGUAGE_INFO_URL, VOTE_COUNT_UPDATE_URL } from './constants';

const App = () => {

  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GET_LANGUAGE_INFO_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const parsedData = data.body ? JSON.parse(data.body) : data;
        if (Array.isArray(parsedData)) {
          setLanguages(parsedData);
        } else {
          console.error('Invalid data format received:', parsedData);
        }
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  }, []);


  const handleVote = async (language) => {
    try {
      // Update vote count
      const updateResponse = await fetch(VOTE_COUNT_UPDATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: language,
        }),
      });
  
      if (!updateResponse.ok) {
        throw new Error(`Failed to update vote count. Status: ${updateResponse.status}`);
      }
  
      // Fetch updated language info
      const languageInfoResponse = await fetch(GET_LANGUAGE_INFO_URL);
      if (!languageInfoResponse.ok) {
        throw new Error(`Failed to fetch language info. Status: ${languageInfoResponse.status}`);
      }
  
      const languageInfoData = await languageInfoResponse.json();
      console.log(languageInfoData)
      const parsedData = languageInfoData.body ? JSON.parse(languageInfoData.body) : languageInfoData;
  
      if (Array.isArray(parsedData)) {
        setLanguages(parsedData);  // Assuming setLanguages is a state setter function
      } else {
        console.error('Invalid data format received:', parsedData);
      }
    } catch (error) {
      console.error('Error handling vote:', error);
    }
  };
  
  return (
    <div className="container mx-auto">
      <div class="flex justify-center items-center h-full mt-8">
        <p class="font-bold text-3xl text-center">
          Vote for your 
          <span class="text-gray-700 mx-1 font-extrabold text-4xl relative inline-block stroke-current">
           Favourite
            <svg class="absolute -bottom-0.5 w-full max-h-1.5" viewBox="0 0 55 5" xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none">
              <path d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002" stroke-width="2"></path>
            </svg>
          </span>
           programming language!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
        {languages.map(language => (
          <LanguageCard key={language.language} language={language} handleVote={handleVote} />
        ))}
      </div>
    </div>
  );
};

export default App;
