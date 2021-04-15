import { createContext, useState } from 'react';

export const searchData = createContext('');

export const SearchProvider = ({ children, settings }) => {
  const [currentSearch, setCurrentSearch] = useState(settings || '');

  const saveSearch = values => {
    setCurrentSearch(values);
  };

  return (
    <searchData.Provider value={{ settings: currentSearch, saveSearch }}>
      {children}
    </searchData.Provider>
  );
};

export const SearchConsumer = searchData.Consumer;

export default searchData;
