import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, FlatList, BackHandler, Alert } from 'react-native';
import ItemCard from '../components/ItemCard';
import { appContext } from '../helpers/AppContext';
import { useFocusEffect } from '@react-navigation/native';

const Dashboard = ({ route }) => {
    const [entries, setEntries] = useState([]);
    const context = useContext(appContext);

    useEffect(() => {
        setEntries(route.params.entries);
    }, [])

    const hadleAddToFavourites = (index) => {
        setEntries((prevState) => {
            prevState[index].isFavourite = true;
            return [...prevState]
        })
        context.saveToFavourites(entries[index]);
    }

    useFocusEffect(
        useCallback(() => {
            const handleBackButton = () => {
                Alert.alert(
                    'Exit Application',
                    'Sure want to exit application?', [{
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    }, {
                        text: 'OK',
                        onPress: () => BackHandler.exitApp()
                    },], {
                    cancelable: false
                })
                return true;
            }
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }, [])
    );

    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={entries}
                renderItem={data => <ItemCard data={data} addTofavourite={hadleAddToFavourites} dashboard />}
                extraData={entries}
                keyExtractor={(_, index) => index}
            />
        </View>
    )
}

export default Dashboard;