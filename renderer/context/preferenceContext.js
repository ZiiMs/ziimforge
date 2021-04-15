import { createContext } from 'react';
import store from '../store';

export const preference = createContext({
  theme: store.get('theme'),
  location: 'empty',
});
