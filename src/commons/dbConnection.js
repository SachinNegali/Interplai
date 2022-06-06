import SQLite from 'react-native-sqlite-storage';

export const openDb = SQLite.openDatabase(
    {
        name: 'FavouritesDB',
        location: 'default'
    },
    () => { },
    error => console.log('SQLite error', error)
);