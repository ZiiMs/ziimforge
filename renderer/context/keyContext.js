import { createContext, useState } from 'react';

const keyData = createContext();

export const KeyProvider = props => {
  const [currentKey, setCurrentKey] = useState();
  return (
    <keyData.Provider value={[currentKey, setCurrentKey]}>
      {props.children}
    </keyData.Provider>
  );
};

export const KeyConsumer = keyData.Consumer;

export default keyData;
