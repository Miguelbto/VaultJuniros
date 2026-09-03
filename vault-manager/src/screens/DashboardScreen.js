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
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import SummaryCards from '../components/SummaryCards';
import TransactionItem from '../components/TransactionItem';
import TransactionModal from '../components/TransactionModal';
import {
  getTotals,
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../database/transactionRepository';

export default function DashboardScreen({ navigation }) {
  const [totais, setTotais] = useState({
    saldo: 0,
    receitas: 0,
    despesas: 0,
  });
  const [recentes, setRecentes] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [itemToEdit, setItemToEdit] = useState(null)

  // Recarrega os saldos sempre que a tela ganha foco
  const loadData = useCallback(async () => {
    try {
      const totaisData = await getTotals();
      const transactionsData = await getTransactions();
      //Pega apenas as 3 útimas movimentações para o resumo do Dashboard
      setRecentes(transactionsData.slice(0, 3))
      setTotais(totaisData);
    } catch (error) {
      console.error('Erro ao buscar totais do banco:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  // Manipulação cadastro ou edição via Modal
  const handleSavetransaction = async (data) => {
    try {
      if (data.id) {
        await updateTransaction(
          data.id,
          data.descricao,
          data.valor,
          data.tipo,
          data.categoria,
          data.data
        )
      } else {
        await addTransaction(
          data.descricao,
          data.valor,
          data.tipo,
          data.categoria,
          data.data
        )
      }
      loadData()
    } catch (error) {
      Alert.alert('Erro, não foi possível salvar a transação')
    }
  }

  //Confirmação e exclusão de registro
  const HandleDeletetransaction = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja realmente remover está transação ?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTransaction(id)
              loadData()
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o registro')
            }
          },
        },
      ]
    )
  }

  const handleOpenAddModal = () => {
    setItemToEdit(null)
    setModalVisible(true)
  }

  const handleOpenEditModal = (item) => {
    setItemToEdit(item)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} >
        {/* Cabeçalho de Boas Vindas */}
        <View style={styles.header} >
          <Text style={styles.greeting}>Olá Usuário</Text>
          <Text style={styles.subtitle}>Visão Geral das suas finanças</Text>
        </View>

        {/* Componente dos Cards de Saldo */}
        <SummaryCards
          saldo={totais.saldo}
          receitas={totais.receitas}
          despesas={totais.despesas}
        />

        {/* Seção de ultimas Movimentações */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Últimas Movimentações</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Histórico')} >
            <Text style={styles.seeAllText}>Ver Todas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {recentes.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma movimentação cadastrada</Text>
          ) : (
            recentes.map((item) => (
              <TransactionItem
                key={item.id}
                item={item}
                onEdit={handleOpenEditModal}
                onDelete={HandleDeletetransaction}
              />
            ))
          )}

        </View>
      </ScrollView>


      {/* Botão flutuante (FAB) (+) */}
      <TouchableOpacity style={styles.fab} onPress={handleOpenAddModal}>
        <Ionicons name='add' size={28} color='#FFFFFF' />
      </TouchableOpacity>

      {/* Modal reutilizavel de formulario */}
      <TransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSavetransaction}
        itemToEdit={itemToEdit}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  
});
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  emptyText: {
    textAlign: 'center',
    color: '#94A3B8',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6366F1',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
