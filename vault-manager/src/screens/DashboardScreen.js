// screens/DashboardScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography, shadow } from '../theme';
import TransactionCard from '../components/TransactionCard';
import { transactions } from '../data/mockTransactions';

export default function DashboardScreen({ onAddPress }) {
  const receitas = transactions
    .filter((t) => t.type === 'receita')
    .reduce((sum, t) => sum + t.value, 0);

  const despesas = transactions
    .filter((t) => t.type === 'despesa')
    .reduce((sum, t) => sum + Math.abs(t.value), 0);

  const saldo = receitas - despesas;

  return (
    <View style={styles.}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.}>
        {/* Header */}
        <View style={styles.}>
          <View style={styles.}>
            <View style={styles.}>
              <Ionicons name="person" size={18} color={colors.primary} />
            </View>
            <Text style={typography.caption}>Olá, Usuário</Text>
          </View>
        </View>
        <Text style={[typography.h1, styles.]}>Visão Geral</Text>

        {/* Saldo card */}
        <View style={[styles., shadow.card]}>
          <View style={styles.}>
            <Ionicons name="pie-chart" size={20} color={colors.textInverse} />
          </View>
          <Text style={styles.}>Saldo Atual</Text>
          <Text style={typography.amount}>
            R$ {saldo.toFixed(2).replace('.', ',')}
          </Text>
          <Text style={styles.}>Atualizado há 5 minutos</Text>
        </View>

        {/* Receitas / Despesas */}
        <View style={styles.}>
          <View style={[styles., shadow.card]}>
            <View style={[styles., { backgroundColor: colors.successLight }]}>
              <Ionicons name="arrow-up" size={16} color={colors.success} />
            </View>
            <Text style={typography.caption}>Receitas</Text>
            <Text style={[typography.bodyBold, { color: colors.success }]}>
              R$ {receitas.toFixed(2).replace('.', ',')}
            </Text>
          </View>

          <View style={[styles., shadow.card]}>
            <View style={[styles., { backgroundColor: colors.dangerLight }]}>
              <Ionicons name="arrow-down" size={16} color={colors.danger} />
            </View>
            <Text style={typography.caption}>Despesas</Text>
            <Text style={[typography.bodyBold, { color: colors.danger }]}>
              R$ {despesas.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

        {/* Últimas movimentações */}
        <View style={styles.}>
          <Text style={typography.h2}>Últimas Movimentações</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        {transactions.slice(0, 3).map((item) => (
          <TransactionCard key={item.id} item={item} />
        ))}
      </ScrollView>

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
