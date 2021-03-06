import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, BackHandler, Alert } from 'react-native';
import ItemCard from '../components/ItemCard';
import { useFocusEffect } from '@react-navigation/native';
import { openDb } from '../commons/dbConnection';
const db = openDb;

const Dashboard = ({ route }) => {
    const [entries, setEntries] = useState([]);
    const [favourites, setFavourites] = useState([]);

    const getFavourites = () => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Favourites",
                [],
                (tx, results) => {
                    let favsArray = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        favsArray.push(results.rows.item(i));
                    }
                    setFavourites(favsArray);
                }
            )
        })
    }

    useEffect(() => {
        setEntries(route.params.entries);
        getFavourites();
    }, []);

    const addFavourite = async (index) => {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                "INSERT INTO Favourites (ID, API) VALUES (?, ?)",
                [index, entries[index].API],
                () => { getFavourites() },
                error => console.log('error adding', error)
            )
        })
    }

    const removeFavourite = async (index) => {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                `DELETE FROM Favourites WHERE ID=${index}`,
                [],
                () => { getFavourites() },
                error => console.log('error deleting', error)
            )
        })
    }

    const hadleAddToFavourites = async (index) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM Favourites WHERE ID=${index}`,
                [],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        Alert.alert(
                            `Remove ${entries[index].API}`,
                            `Sure want to remove ${entries[index].API} from favourites?`, [{
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                            }, {
                                text: 'OK',
                                onPress: () => removeFavourite(index)
                            },])
                    } else addFavourite(index)
                }
            )
        })
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
                renderItem={data => <ItemCard data={data} addOrRemovefavourite={hadleAddToFavourites} dashboard favourites={favourites} />}
                extraData={entries}
                keyExtractor={(_, index) => index}
            />
        </View>
    )
}

export default Dashboard;