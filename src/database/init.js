import * as SQLite from 'expo-sqllite'

//Retorna a instância de conexão com o banco
export async function getDbConnection() {
    return await SQLite.openDatabaseAsync('financas.db')
}

export async function initDatabase(){
    const db = await getDbConnection()
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS transacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      valor REAL NOT NULL,
      tipo TEXT NOT NULL,
      categoria TEXT NOT NULL,
      data TEXT NOT NULL
    );
    `)
}
