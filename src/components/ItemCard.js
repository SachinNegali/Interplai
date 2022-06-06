import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../constants/colors';

const ItemCard = ({ data, addOrRemovefavourite, favourites }) => {
    const isFavourite = favourites ? favourites.filter(fav => fav.ID === data.index).length > 0 : true
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{data.item.API}</Text>
            <Icon
                name={isFavourite ? 'heart' : 'heart-o'}
                size={20}
                color={colors.primary}
                onPress={() => addOrRemovefavourite(data.index)}
            />
        </View>
    )
}

export default ItemCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        color: '#000'
    }
})