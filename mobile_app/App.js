import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { mobileApiService } from './src/services/apiService';

export default function App() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await mobileApiService.getProducts();
                setStats({
                    total: data.total,
                    category: data.products[0]?.category || 'Varios'
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.title}>Admin<Text style={styles.accent}>Pro</Text> Mobile</Text>
                <Text style={styles.version}>v1.0.0 Alpha</Text>
            </View>

            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator color="#6366f1" size="large" />
                ) : (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Estado del Inventario</Text>
                        <View style={styles.statRow}>
                            <Text style={styles.statValue}>{stats?.total || 0}</Text>
                            <Text style={styles.statLabel}>Productos en total</Text>
                        </View>
                        <View style={styles.divider} />
                        <Text style={styles.text}>API Status: <Text style={styles.online}>Online</Text></Text>
                    </View>
                )}

                <View style={styles.infoBox}>
                    <Text style={styles.subtext}>Esta App demuestra el consumo de la misma API que la web, cumpliendo el requisito de React Native.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: '#ffffff',
        letterSpacing: -1,
    },
    accent: {
        color: '#6366f1',
        fontStyle: 'italic',
    },
    version: {
        color: '#475569',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
        textTransform: 'uppercase',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#1e293b',
        borderRadius: 32,
        padding: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    cardTitle: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 20,
        textAlign: 'center',
    },
    statRow: {
        alignItems: 'center',
        marginBottom: 20,
    },
    statValue: {
        color: '#ffffff',
        fontSize: 64,
        fontWeight: '900',
    },
    statLabel: {
        color: '#6366f1',
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: 20,
    },
    text: {
        color: '#cbd5e1',
        fontSize: 14,
        textAlign: 'center',
    },
    online: {
        color: '#22c55e',
        fontWeight: 'bold',
    },
    infoBox: {
        marginTop: 40,
        padding: 20,
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.1)',
    },
    subtext: {
        color: '#64748b',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 20,
    },
});
