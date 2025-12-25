import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SettingsContext } from './SettingsContext';  // import context

export default function SettingsScreen() {
  const { currency, setCurrency, language, setLanguage } = useContext(SettingsContext);

  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currencyItems, setCurrencyItems] = useState([
    { label: 'USD ($)', value: 'USD' },
    { label: 'HKD (HK$)', value: 'HKD' },
    { label: 'EUR (€)', value: 'EUR' },
  ]);

  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageItems, setLanguageItems] = useState([
    { label: 'English', value: 'English' },
    { label: '中文', value: 'Chinese' },
  ]);

  return (
    <View style={styles.container}>


      <Text style={styles.label}>Currency</Text>
      <DropDownPicker
        open={currencyOpen}
        value={currency}
        items={currencyItems}
        setOpen={setCurrencyOpen}
        setItems={setCurrencyItems}
        onSelectItem={(item) => setCurrency(item.value)}
        style={styles.dropdown}
        containerStyle={{ marginBottom: 20 }}
      />

      <Text style={styles.label}>Language</Text>
      <DropDownPicker
        open={languageOpen}
        value={language}
        items={languageItems}
        setOpen={setLanguageOpen}
        setItems={setLanguageItems}
        onSelectItem={(item) => setLanguage(item.value)}
        style={styles.dropdown}
      />

      {/* Attribution section */}
      <View style={styles.attributionContainer}>
        <Text style={styles.attributionText}>
          Icons created by Freepik - Flaticon
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.flaticon.com/authors/freepik')}>
          <Text style={styles.link}>View on Flaticon</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fdfdfd' },
  label: { marginBottom: 10, fontSize: 18, fontWeight: '600' },
  dropdown: { borderColor: '#ccc', marginBottom: 20 },
  attributionContainer: { marginTop: 40, alignItems: 'center' },
  attributionText: { fontSize: 12, color: '#666', textAlign: 'center' },
  link: { fontSize: 12, color: '#007AFF', marginTop: 4 },
});