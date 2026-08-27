// components/NewTransactionModal.js
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme';

export default function NewTransactionModal({ visible, onClose, onSave }) {
  const [type, setType] = useState('receita'); // 'receita' | 'despesa'
  const [amount, setAmount] = useState('0,00');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('24/10/2023');
  const [confirmed, setConfirmed] = useState(true);

  const accentColor = type === 'receita' ? colors.success : colors.danger;

  const handleSave = () => {
    onSave?.({ type, amount, description, category, date, confirmed });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.sheet}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={typography.h2}>Nova Transação</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Tipo */}
          <View style={styles.typeRow}>
            <TouchableOpacity
              style={[
                styles.typePill,
                type === 'receita' && { backgroundColor: colors.success },
              ]}
              onPress={() => setType('receita')}
              activeOpacity={0.85}
            >
              <Ionicons
                name="add"
                size={16}
                color={type === 'receita' ? colors.textInverse : colors.textSecondary}
              />
              <Text
                style={[
                  styles.typeLabel,
                  type === 'receita' && styles.typeLabelActive,
                ]}
              >
                Receita
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typePill,
                type === 'despesa' && { backgroundColor: colors.danger },
              ]}
              onPress={() => setType('despesa')}
              activeOpacity={0.85}
            >
              <Ionicons
                name="remove"
                size={16}
                color={type === 'despesa' ? colors.textInverse : colors.textSecondary}
              />
              <Text
                style={[
                  styles.typeLabel,
                  type === 'despesa' && styles.typeLabelActive,
                ]}
              >
                Despesa
              </Text>
            </TouchableOpacity>
          </View>

          {/* Valor */}
          <View style={styles.amountWrap}>
            <Text style={[styles.currencyPrefix, { color: accentColor }]}>R$</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              style={[styles.amountInput, { color: accentColor }]}
              placeholder="0,00"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* Descrição */}
          <View style={styles.field}>
            <Ionicons name="pencil-outline" size={18} color={colors.textSecondary} />
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Ex: Conta de Luz"
              placeholderTextColor={colors.textSecondary}
              style={styles.fieldInput}
            />
          </View>

          {/* Categoria */}
          <TouchableOpacity style={styles.field} activeOpacity={0.7}>
            <Ionicons name="folder-outline" size={18} color={colors.textSecondary} />
            <Text
              style={[
                styles.fieldInput,
                { color: category ? colors.textPrimary : colors.textSecondary },
              ]}
            >
              {category || 'Selecione uma categoria'}
            </Text>
            <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
          </TouchableOpacity>

          {/* Data */}
          <TouchableOpacity style={styles.field} activeOpacity={0.7}>
            <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.fieldInput}>{date}</Text>
          </TouchableOpacity>

          {/* Toggle */}
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={typography.bodyBold}>Já foi paga/recebida?</Text>
              <Text style={typography.caption}>Sim, confirmar no saldo.</Text>
            </View>
            <Switch
              value={confirmed}
              onValueChange={setConfirmed}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={confirmed ? colors.primary : '#FFFFFF'}
            />
          </View>

          {/* Salvar */}
          <TouchableOpacity style={styles.saveButton} activeOpacity={0.85} onPress={handleSave}>
            <Ionicons name="checkmark-circle-outline" size={18} color={colors.textInverse} />
            <Text style={styles.saveButtonText}>Salvar Transação</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  typePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  typeLabelActive: {
    color: colors.textInverse,
  },
  amountWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  currencyPrefix: {
    fontSize: 22,
    fontWeight: '700',
    marginRight: 6,
  },
  amountInput: {
    fontSize: 34,
    fontWeight: '800',
    minWidth: 120,
    textAlign: 'center',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    marginBottom: spacing.sm,
  },
  fieldInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 16,
  },
  saveButtonText: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: '700',
  },
});
