import { createContext, useState } from 'react';

const searchData = createContext('defausdwaerlt');

export const SearchProvider = props => {
  const [currentSearch, setCurrentSearch] = useState('');
  return (
    <searchData.Provider value={[currentSearch, setCurrentSearch]}>
      {props.children}
    </searchData.Provider>
  );
};

export const SearchConsumer = searchData.Consumer;

export default searchData;
