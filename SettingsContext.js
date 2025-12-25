import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');

  // Load saved settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedCurrency = await AsyncStorage.getItem('currency');
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedCurrency) setCurrency(savedCurrency);
        if (savedLanguage) setLanguage(savedLanguage);
      } catch (e) {
        console.log('Failed to load settings', e);
      }
    };
    loadSettings();
  }, []);

  // Persist currency changes
  useEffect(() => {
    AsyncStorage.setItem('currency', currency);
  }, [currency]);

  // Persist language changes
  useEffect(() => {
    AsyncStorage.setItem('language', language);
  }, [language]);

  return (
    <SettingsContext.Provider
      value={{ currency, setCurrency, language, setLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  );
};