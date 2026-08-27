// data/mockTransactions.js

export const transactions = [
  {
    id: '1',
    icon: 'cart-outline',
    category: 'Supermercado',
    subtitle: 'Alimentação • 25/08',
    value: -150.0,
    status: 'Pago',
    type: 'despesa',
  },
  {
    id: '2',
    icon: 'cash-outline',
    category: 'Salário',
    subtitle: 'Renda • 05/08',
    value: 4500.0,
    status: 'Recebido',
    type: 'receita',
  },
  {
    id: '3',
    icon: 'car-outline',
    category: 'Gasolina',
    subtitle: 'Transporte • 22/08',
    value: -180.0,
    status: 'Pendente',
    type: 'despesa',
  },
  {
    id: '4',
    icon: 'home-outline',
    category: 'Aluguel',
    subtitle: 'Moradia • 10/08',
    value: -1200.0,
    status: 'Pago',
    type: 'despesa',
  },
  {
    id: '5',
    icon: 'laptop-outline',
    category: 'Freelance',
    subtitle: 'Renda extra • 18/08',
    value: 800.0,
    status: 'Recebido',
    type: 'receita',
  },
];

export const categories = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Saúde',
  'Educação',
  'Renda',
  'Outros',
];
