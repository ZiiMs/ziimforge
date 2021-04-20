import { createContext, useState } from 'react';
import store from '../store';

const defaults = {
  theme: store.get('theme'),
  filePath: store.get('wowFolder'),
};

const preferences = createContext(defaults);

export const PreferenceProvider = props => {
  const [currentPreferences, setCurrentPreferences] = useState(defaults);
  return (
    <preferences.Provider value={[currentPreferences, setCurrentPreferences]}>
      {props.children}
    </preferences.Provider>
  );
};

export const PreferenceConsumer = preferences.Consumer;

export default preferences;

export const updateStore = (theme, path) => {
  store.set('theme', theme);
  store.set('wowFolder', path);
};
