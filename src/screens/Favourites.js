import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import ItemCard from '../components/ItemCard';
import { appContext } from '../helpers/AppContext'

const Favourites = ({ navigation }) => {
    const [favourites, setFavourites] = useState([]);
    const context = useContext(appContext);

    useEffect(() => {
        setFavourites(context.favourites);
    }, [context]);

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