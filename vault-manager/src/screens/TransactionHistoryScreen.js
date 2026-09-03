// screens/TransactionHistoryScreen.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography, shadow } from '../theme';
import TransactionCard from '../components/TransactionCard';
import { transactions } from '../data/mockTransactions';

const FILTERS = [
  { key: 'todos', label: 'Todos' },
  { key: 'receita', label: 'Receitas' },
  { key: 'despesa', label: 'Despesas' },
];

export default function TransactionHistoryScreen({ onAddPress }) {
  const [filter, setFilter] = useState('todos');

  const filtered = useMemo(() => {
    if (filter === 'todos') return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [filter]);

  return (
    <View style={styles.}>
      {/* Header */}
      <View style={styles.}>
        <View style={styles.}>
          <View style={styles.}>
            <Ionicons name="person" size={18} color={colors.primary} />
          </View>
          <Text style={typography.body}>Olá, Usuário</Text>
        </View>
        <TouchableOpacity style={styles.}>
          <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <Text style={[typography.h1, styles.]}>Minhas Transações</Text>

      {/* Filtros */}
      <View style={styles.}>
        {FILTERS.map((f) => {
          const isActive = f.key === filter;
          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[styles.filterPill, isActive && styles.filterPillActive]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.,
                  isActive && styles.,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Lista */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard item={item} />}
        contentContainerStyle={styles.}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, shadow.fab]}
        activeOpacity={0.85}
        onPress={onAddPress}
      >
        <Ionicons name="add" size={26} color={colors.textInverse} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
});