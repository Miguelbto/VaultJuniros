// components/TransactionCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography, shadow } from '../theme';

const STATUS_STYLES = {
  Pago: { bg: colors.successLight, color: colors.success },
  Recebido: { bg: colors.successLight, color: colors.success },
  Pendente: { bg: colors.warningLight, color: colors.warning },
};

export default function TransactionCard({ item }) {
  const isPositive = item.value > 0;
  const statusStyle = STATUS_STYLES[item.status] || STATUS_STYLES.Pendente;

  const formattedValue = `${isPositive ? '+' : '-'} R$ ${Math.abs(item.value)
    .toFixed(2)
    .replace('.', ',')}`;

  return (
    <View style={[styles.card, shadow.card]}>
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: isPositive ? colors.successLight : colors.dangerLight },
        ]}
      >
        <Ionicons
          name={item.icon}
          size={20}
          color={isPositive ? colors.success : colors.danger}
        />
      </View>

      <View style={styles.info}>
        <Text style={typography.bodyBold}>{item.category}</Text>
        <Text style={typography.caption}>{item.subtitle}</Text>
      </View>

      <View style={styles.right}>
        <Text
          style={[
            typography.bodyBold,
            { color: isPositive ? colors.success : colors.danger },
          ]}
        >
          {formattedValue}
        </Text>
        <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.badgeText, { color: statusStyle.color }]}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
  },
  badge: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
