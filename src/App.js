// App.js
import { useState } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView } from 'react-native';

import { colors } from './theme';
import BottomNav from './components/BottomNav';
import NewTransactionModal from './components/NewTransactionModal';
import DashboardScreen from './screens/DashboardScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const handleSaveTransaction = (transaction) => {
    // Aqui você conectaria com seu estado global / API
    console.log('Nova transação:', transaction);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'transacoes':
        return <TransactionHistoryScreen onAddPress={() => setModalVisible(true)} />;
      case 'dashboard':
      default:
        return <DashboardScreen onAddPress={() => setModalVisible(true)} />;
      // 'orcamentos' e 'perfil' podem ser adicionados depois seguindo o mesmo padrão
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>{renderScreen()}</View>
      <BottomNav active={activeTab} onChange={setActiveTab} />

      <NewTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTransaction}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
});
