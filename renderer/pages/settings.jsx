import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import {
  Radio,
  RadioGroup,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Form,
} from 'rsuite';
import preference, { updateStore } from '../context/preferenceContext';
// import searchContext from '../context/searchContext';

function Settings() {
  const [preferences, setPreferences] = useContext(preference);
  const [filePath, setFilePath] = useState(preferences.filePath);
  const [theme, setTheme] = useState(preferences.filePath);
  // const [search] = useContext(searchContext);
  useEffect(() => {
    setFilePath(preferences.filePath);
    setTheme(preferences.theme);
    console.log('Change');
    return () => {};
  }, [preferences]);

  // useEffect(() => {
  //   setPreferences({
  //     theme,
  //     filePath,
  //   });
  //   return () => {};
  // }, [filePath, setPreferences, theme]);
  // console.log(search);

  const handleTheme = e => {
    // console.log('UpdateTheme', e);
    setPreferences({
      theme: e,
      filePath,
    });
    updateStore(e, filePath);
  };

  const handlePath = e => {
    setPreferences({
      theme,
      filePath: e,
    });
    updateStore(theme, e);
  };

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <a>This is a settings page</a>
      <p>Theme: {theme}</p>
      <p>filePath: {filePath}</p>
      <Form layout="horizontal">
        <FormGroup>
          <ControlLabel>Change Theme</ControlLabel>
          <RadioGroup
            inline
            value={theme}
            onChange={value => handleTheme(value)}
          >
            <Radio value="default">Default</Radio>
            <Radio value="inverse">Inverse</Radio>
            <Radio value="subtle">Subtle</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Path</ControlLabel>
          <FormControl
            name="name"
            value={filePath}
            onChange={value => handlePath(value)}
          />
          <HelpBlock>Required</HelpBlock>
        </FormGroup>
      </Form>
    </>
  );
}

export default Settings;
