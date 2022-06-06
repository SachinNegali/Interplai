import React, { useEffect, useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native';
import ItemCard from '../components/ItemCard';
import { openDb } from '../commons/dbConnection';
import { colors } from '../constants/colors';

const db = openDb;

const Favourites = ({ navigation }) => {
    const [favourites, setFavourites] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getFavourites = () => {
        setRefreshing(true);
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Favourites",
                [],
                (tx, results) => {
                    let favsArray = []
                    for (let i = 0; i < results.rows.length; i++) {
                        favsArray.push(results.rows.item(i));
                    }
                    setFavourites(favsArray);
                    setRefreshing(false)
                }
            )
        })
    }

    useEffect(() => {
        getFavourites();
    }, []);

    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={favourites}
                renderItem={data => <ItemCard data={data} />}
                extraData={favourites}
                keyExtractor={(_, index) => index}
                refreshControl={<RefreshControl
                    colors={[colors.primary]}
                    refreshing={refreshing}
                    onRefresh={() => getFavourites()} />}
            />
        </View>
    )
}

export default Favourites;
