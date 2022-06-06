import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { colors } from '../constants/colors';

const url = 'https://api.publicapis.org/entries'

const SplashScreen = ({ navigation }) => {

    const fetchData = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                navigation.navigate('Drawer', {
                    screen: 'Home',
                    params: {
                        screen: 'Dashboard',
                        params: {
                            entries: data.entries
                        },
                    },
                })
            }
            );
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            <ActivityIndicator color={colors.primary} size={50} />
            <Text style={styles.text}>Fetching Data...</Text>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center'
    },
    text: {
        alignSelf: 'center',
        marginTop: 50
    }
})