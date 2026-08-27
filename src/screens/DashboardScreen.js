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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={18} color={colors.primary} />
            </View>
            <Text style={typography.caption}>Olá, Usuário</Text>
          </View>
        </View>
        <Text style={[typography.h1, styles.title]}>Visão Geral</Text>

        {/* Saldo card */}
        <View style={[styles.balanceCard, shadow.card]}>
          <View style={styles.balanceIconWrap}>
            <Ionicons name="pie-chart" size={20} color={colors.textInverse} />
          </View>
          <Text style={styles.balanceLabel}>Saldo Atual</Text>
          <Text style={typography.amount}>
            R$ {saldo.toFixed(2).replace('.', ',')}
          </Text>
          <Text style={styles.balanceUpdated}>Atualizado há 5 minutos</Text>
        </View>

        {/* Receitas / Despesas */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, shadow.card]}>
            <View style={[styles.summaryIcon, { backgroundColor: colors.successLight }]}>
              <Ionicons name="arrow-up" size={16} color={colors.success} />
            </View>
            <Text style={typography.caption}>Receitas</Text>
            <Text style={[typography.bodyBold, { color: colors.success }]}>
              R$ {receitas.toFixed(2).replace('.', ',')}
            </Text>
          </View>

          <View style={[styles.summaryCard, shadow.card]}>
            <View style={[styles.summaryIcon, { backgroundColor: colors.dangerLight }]}>
              <Ionicons name="arrow-down" size={16} color={colors.danger} />
            </View>
            <Text style={typography.caption}>Despesas</Text>
            <Text style={[typography.bodyBold, { color: colors.danger }]}>
              R$ {despesas.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

        {/* Últimas movimentações */}
        <View style={styles.sectionHeader}>
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: spacing.md,
  },
  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  balanceIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  balanceUpdated: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  summaryIcon: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
