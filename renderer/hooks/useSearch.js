import { useContext } from 'react';
import searchContext from '../context/searchContext';

export default () => {
  const context = useContext(searchContext);
  return context;
};
