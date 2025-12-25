// HistoryScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

export default function HistoryScreen({ route }) {
  const { history } = route.params || { history: [] };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Text style={styles.text}>
        🍽️ {item.date} — Worth: ${item.value}
      </Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      {history.length === 0 ? (
        <Text style={styles.empty}>No records yet</Text>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item, idx) => idx.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fdfdfd' },
  card: { padding: 12, marginVertical: 6 },
  text: { fontSize: 16 },
  empty: { fontSize: 16, color: '#888' },
});