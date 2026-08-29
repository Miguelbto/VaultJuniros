import React, {useState, useCallback } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import SummaryCards from '../components/SummaryCards'
import { getTotals } from '../database/transactionRepository'

export default function DashboardScreen(){
    const [ totais, setTotais ] = useState({
        total: 0,
        receita: 0,
        despesa: 0,
    })

    //Recarrega os saldos sempre que a tela ganha foco
    const fetchTotals = useCallback(async () => {
        try {
            const data = await getTotals()
            setTotais(data)
        } catch (error) {
            console.error('erro ao buscar totais do banco')
        }
    }, [])


    useFocusEffect( useCallback(() => {
        fetchTotals()
    }, [fetchTotals]))

    return (
        <ScrollView style={styles.container}>
            {/* Passa os dados buscados no SQLite para o componente de cards */}
            <SummaryCards 
            saldo={totais.saldo} 
            receitas={totais.receita} 
            despesas={totais.despesa}
            />
        </ScrollView>
    )
}



import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SummaryCards from '../components/SummaryCards';
import { getTotals } from '../database/transactionRepository';

export default function DashboardScreen() {
  const [totais, setTotais] = useState({
    saldo: 0,
    receitas: 0,
    despesas: 0,
  });

  // Recarrega os saldos sempre que a tela ganha foco
  const fetchTotals = useCallback(async () => {
    try {
      const data = await getTotals();
      setTotais(data);
    } catch (error) {
      console.error('Erro ao buscar totais do banco:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTotals();
    }, [fetchTotals])
  );

  return (
    <ScrollView style={styles.container}>
      {/* Passa os dados buscados no SQLite para o componente de cards */}
      <SummaryCards
        saldo={totais.saldo}
        receitas={totais.receitas}
        despesas={totais.despesas}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});