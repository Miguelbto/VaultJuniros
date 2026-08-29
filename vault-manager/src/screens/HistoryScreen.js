import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HistoryScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tela de Histórico (Em breve)</Text>
        </View>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  text: {
    fontSize: 16,
    color: '#64748B',
  },
});