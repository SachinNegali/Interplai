import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList } from 'react-native';
import ItemCard from '../components/ItemCard';
import { appContext } from '../helpers/AppContext';
import { openDb } from '../commons/dbConnection';

const db = openDb;

const Favourites = ({ navigation }) => {
    const [favourites, setFavourites] = useState([]);
    const context = useContext(appContext);

    const getFavourites = () => {
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
                }
            )
        })
    }

    useEffect(() => {
        getFavourites();
    }, []);

    console.log('FAVOURITESS inside favsss', favourites);

    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={favourites}
                renderItem={data => <ItemCard data={data} />}
                extraData={favourites}
                keyExtractor={(_, index) => index}
            />
        </View>
    )
}

export default Favourites