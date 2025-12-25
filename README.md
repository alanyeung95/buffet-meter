1. Overview
Buffet Meter is a React Native / Expo app that calculates the “worth” of a buffet meal.
- Users select food items, toggle units (100g or set), and adjust quantities.
- The app computes the total value based on conversion rates and price per 100g.
- Includes Settings (currency & language) and History (past calculations).
- Navigation handled via React Navigation.
- A CongratulationModal component now celebrates the user’s achievement with an image and message instead of a plain alert.

2. Screens
BuffetScreen
- Displays food list in a FlatList.
- Each row shows:
- Food name
- Food icon (currently placeholder, later vector icons)
- Unit toggle (100g ↔ Set)
- Quantity selector (+ / – buttons)
- Calculate! button → computes total worth and triggers CongratulationModal.
- Settings + History icons → displayed horizontally below Calculate.
SettingsScreen
- Dropdown lists for:
- Currency (USD, HKD, EUR)
- Language (English, 中文)
- Implemented with react-native-dropdown-picker.
- State stored locally with useState.
HistoryScreen
- Displays past calculation records.
- Each record shows:
- Date/time
- Calculated value
- Implemented with FlatList and Card.
- Shows “No records yet” if empty.
CongratulationModal (new)
- Custom modal component that overlays the BuffetScreen.
- Displays:
- MVP image (full.png)
- Congratulatory text
- Calculated meal value
- OK button to dismiss
- Replaces Alert.alert.

3. Navigation
- Using React Navigation (native stack).
- Screens:
- BuffetScreen
- SettingsScreen
- HistoryScreen
- Navigation triggered by icon buttons.
- Modal (CongratulationModal) is rendered inside BuffetScreen, not part of navigation stack.

4. Data Model
Food Data
{
  name: string,
  defaultUnit: 'Set' | '100g',
  conversionRate: number, // how many sets ≈ 100g
  pricePer100g: number,   // USD price per 100g
}


Example
{ name: 'Sushi', defaultUnit: 'Set', conversionRate: 2, pricePer100g: 5.0 }


Items State
{
  name,
  unit,           // current unit
  quantity,       // user-selected quantity
  conversionRate,
  pricePer100g,
}



5. Calculation Logic
- If unit = 100g:
value = quantity × pricePer100g
- If unit = Set:
value = (quantity / conversionRate) × pricePer100g
- Total = sum of all item values.
- Result shown in CongratulationModal.

6. History Logic
- On each calculation, a record is added:
{
  date: new Date().toLocaleString(),
  value: total.toFixed(2),
}


- Passed to HistoryScreen via navigation params.

7. UI / Styling
- react-native-paper used for Card and Button.
- MaterialCommunityIcons (via @expo/vector-icons) used for Settings & History icons.
- Layout:
- Buffet list in scrollable FlatList.
- Calculate button centered below list.
- Settings + History icons in horizontal row.
- CongratulationModal overlays screen with image + text.

8. Tech Stack
- React Native / Expo
- react-native-paper (UI components)
- @react-navigation/native + native-stack
- @expo/vector-icons (MaterialCommunityIcons)
- react-native-dropdown-picker (dropdowns for settings)

9. Example BuffetScreen Return Block
return (
  <View style={styles.container}>
    <Text style={styles.paragraph}>🍣 Buffet Calculator 🍗</Text>
    <FlatList data={items} renderItem={renderItem} keyExtractor={(item, idx) => idx.toString()} />
    <Button mode="contained" onPress={calculate} style={styles.calculateButton}>
      Calculate!
    </Button>
    <View style={styles.iconRow}>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
        <MaterialCommunityIcons name="cog-outline" size={40} color="#2c3e50" />
        <Text style={styles.iconLabel}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('History', { history })}>
        <MaterialCommunityIcons name="history" size={40} color="#2c3e50" />
        <Text style={styles.iconLabel}>History</Text>
      </TouchableOpacity>
    </View>

    {/* Congratulation Modal */}
    <CongratulationModal
      visible={showModal}
      value={lastValue}
      onClose={() => setShowModal(false)}
    />
  </View>
);


10. Next Steps / TODOs
- Persist Settings (currency & language) globally (Context API or AsyncStorage).
- Apply currency conversion to calculation results.
- Apply language localization to labels/text.
- Persist History beyond session (AsyncStorage or database).
- Replace placeholder icons with meaningful vector icons for each food item.
- Consider bottom tab navigation for Settings & History instead of inline icons.
- Enhance CongratulationModal with confetti animation or share button.

🚀 Summary
Buffet Meter is a buffet value calculator app with:
- Food list + unit/quantity selection
- Calculation logic based on conversion rates & prices
- Settings screen for currency/language
- History screen for past records
- Navigation between screens
- Modern UI with vector icons
- CongratulationModal for achievement celebration
