import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from '../screens/SplashScreen';
import Dashboard from '../screens/Dashboard';
import TabNavigation from './TabNavigation';
import Favourites from '../screens/Favourites';
import DrawerNavigation from './DrawerNavigation';
// import DrawerNavigation from './DrawerNavigation';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Drawer" component={DrawerNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation