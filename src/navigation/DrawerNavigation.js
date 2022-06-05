import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import { colors } from '../constants/colors';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: colors.primary
            }}
        >
            <Drawer.Screen
                name='Home'
                component={TabNavigation}
                initialParams={{ screen: 'Dashboard' }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation