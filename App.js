/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import StackNavigation from './src/navigation/StackNavigation';
import { openDb } from './src/commons/dbConnection';

const db = openDb;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS "
        + "Favourites"
        + "(ID INTEGER PRIMARY KEY, API TEXT);"
      )
    })
  }

  useEffect(() => {
    createTable();
  }, [])
  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <ContextProvider> */}
      <StackNavigation />
      {/* </ContextProvider> */}
    </SafeAreaView>
  );
};

export default App;
