import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { initDatabase } from './src/database/init'
import { ActivityIndicator } from 'react-native/types_generated/index';

export default function App() {

    const [dbPronto, setDbPronto ] = useState(false)

    useEffect(() => {
        initDatabase()
            try {
                async function setUp() {
                    await initDatabase()
                    setDbPronto(true)
                }
            } catch (error) {
                console.erro('Erro ao inicializar banco de dados', error)
            }
            setup()
    }, [])

    if (!dbPronto) {
        return(
            <View style={styles.loadingData}>
                <ActivityIndicator size='large' color='#6366F1' />
                <Text style={styles.subtitle}></Text>
            </View>
        )
    }

    return (
        <View style={styles.loadingData}>
            <Text style={title}> Vault finance</Text>
            <Text style={styles.subtitle}>banco de dados criado e populado</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    loadingData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 18, fontWeight: 'bold'
    },

    subTitle: {
        color: 'green', marginTop: 5
    }
})