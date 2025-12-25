import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuffetScreen from './BuffetScreen';
import SettingsScreen from './SettingsScreen';
import HistoryScreen from './HistoryScreen';
import { SettingsProvider } from './SettingsContext'; // import provider
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={BuffetScreen}
            options={{
              headerTitle: () => (
                <Text style={styles.navbar}>🍣 Buffet Meter 🍗</Text>
              ),
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerTitle: () => <Text style={styles.navbar}>⚙️ Settings</Text>,
            }}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{
              headerTitle: () => <Text style={styles.navbar}>📜 History</Text>,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  navbar: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
  },
});
