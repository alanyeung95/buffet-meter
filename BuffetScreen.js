import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SettingsContext } from './SettingsContext'; // import context
import CongratulationModal from './CongratulationModal';
import foodData from './foodData';
import { convertValue, getCurrencySymbol } from './utils/currency';

// Preload all images here
const groupIcons = {
  sushi: require('./assets/sushi.png'),
  basic: require('./assets/basic.png'),
  grilled: require('./assets/grilled.png'),
  sashimi: require('./assets/sashimi.png'),
  special: require('./assets/special.png'),
  dessert: require('./assets/dessert.png'),
  // add more groups as needed
};

export default function BuffetScreen({ navigation }) {
  const { language, currency } = useContext(SettingsContext); // include currency

  const [items, setItems] = useState(
    foodData.map((food) => ({
      id: food.id,
      name: food.name,
      chineseName: food.chineseName,
      unit: food.defaultUnit,
      quantity: 0,
      conversionRate: food.conversionRate,
      pricePer100g: food.pricePer100g,
      group: food.group,
    }))
  );

  const [showModal, setShowModal] = useState(false);
  const [lastValue, setLastValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [activeGroup, setActiveGroup] = useState('sushi');

  const toggleUnit = (id) => {
    const newItems = items.map((item) =>
      item.id === id
        ? { ...item, unit: item.unit === '100g' ? 'Set' : '100g' }
        : item
    );
    setItems(newItems);
  };

  const changeQuantity = (id, delta) => {
    const newItems = items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    );
    setItems(newItems);
  };

  const calculate = () => {
    let totalUSD = 0;

    items.forEach((item) => {
      if (item.unit === '100g') {
        totalUSD += item.quantity * item.pricePer100g;
      } else {
        totalUSD += (item.quantity / item.conversionRate) * item.pricePer100g;
      }
    });

    const converted = convertValue(totalUSD, currency);

    const record = {
      date: new Date().toLocaleString(),
      value: converted,
      currency,
    };

    setHistory([...history, record]);
    setLastValue(`${converted} ${currency}`);
    setShowModal(true);
  };

  const clearAll = () => {
    const resetItems = items.map((item) => ({
      ...item,
      quantity: 0,
    }));
    setItems(resetItems);
  }

  const renderItem = ({ item }) => (
    <Card style={styles.card} elevation={4}>
      <View style={styles.row}>
        <Image source={groupIcons[item.group]} style={styles.icon} />
        <View style={styles.info}>
          {/* Name + Unit remark */}
          <TouchableOpacity onPress={() => toggleUnit(item.id)}>
            <Text style={styles.foodName}>
              {language === 'English' ? item.name : item.chineseName}
              <Text style={styles.unitRemark}> ({item.unit})</Text>
            </Text>
          </TouchableOpacity>

          <View style={buttonStyles.quantityRow}>
            <Button
              mode="outlined"
              onPress={() => changeQuantity(item.id, -1)}
              style={buttonStyles.quantityButton}
              labelStyle={buttonStyles.quantityButtonLabel}>
              -
            </Button>
            <Text style={buttonStyles.quantity}>{item.quantity}</Text>
            <Button
              mode="outlined"
              onPress={() => changeQuantity(item.id, 1)}
              style={buttonStyles.quantityButton}
              labelStyle={buttonStyles.quantityButtonLabel}>
              +
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groupBar}>
          {['sushi', 'sashimi', 'basic', 'dessert', 'grilled', 'special'].map(
            (group) => (
              <TouchableOpacity
                key={group}
                style={[
                  styles.groupButton,
                  activeGroup === group && styles.groupButtonActive,
                ]}
                onPress={() => setActiveGroup(group)}>
                <Text
                  style={[
                    styles.groupLabel,
                    activeGroup === group && styles.groupLabelActive,
                  ]}>
                  {group.toUpperCase()}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      {/* FlatList fills remaining space */}
      <FlatList
        style={{ flex: 1 }}
        data={items.filter((item) => item.group === activeGroup)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Footer with all buttons */}
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={calculate}
          style={styles.calculateButton}>
          Calculate!
        </Button>
        <Button mode="contained" onPress={clearAll} style={styles.clearButton}>
          Clear All
        </Button>
        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Settings')}>
            <MaterialCommunityIcons
              name="cog-outline"
              size={20}
              color="#2c3e50"
            />
            <Text style={styles.iconLabel}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('History', { history })}>
            <MaterialCommunityIcons name="history" size={20} color="#2c3e50" />
            <Text style={styles.iconLabel}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CongratulationModal
        visible={showModal}
        value={lastValue}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    padding: 12,
  },
  card: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 50, height: 50, marginRight: 12 },
  info: { flex: 1 },
  foodName: { fontSize: 18, fontWeight: '600', color: '#34495e' },
  unitRemark: {
    fontSize: 12, // smaller than main name
    color: '#e67e22', // orange color
    fontWeight: '400', // lighter weight
  },
  footer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  calculateButton: {
    marginTop: 16,
    borderRadius: 30,
    backgroundColor: '#e67e22',
    paddingVertical: 6,
  },
  clearButton: {
    marginTop: 5,
    borderRadius: 30,
    backgroundColor: 'red',
    paddingVertical: 2,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    color: '#2c3e50',
    marginTop: 5,
  },
  groupBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  groupButton: {
    height: 32,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#ecf0f1',
    marginHorizontal: 4,
  },
  groupButtonActive: {
    backgroundColor: '#3498db',
  },
  groupLabel: {
    fontSize: 14,
    color: '#2c3e50',
    textAlign: 'center',
  },
  groupLabelActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

const buttonStyles = StyleSheet.create({
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#16a085',
  },
  quantityButton: {
    borderRadius: 20,
    marginHorizontal: 5,
    borderColor: 'grey', // black border
    borderWidth: 1,
    backgroundColor: '#fff', // white background
    width: 10, // fixed width
    height: 36, // fixed height
  },
  quantityButtonLabel: {
    color: '#000', // black text for +/-
    fontSize: 15,
    fontWeight: 'bold',
  },
});
