import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Dashboard from '../screens/Dashboard';
import Favourites from '../screens/Favourites';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBarOptions={{
                activeTintColor: colors.primary,
                labelStyle: {
                    fontSize: 13,
                },
            }}>
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Icon name="home" color={focused ? colors.primary : colors.disabled} size={25} />
                }}
                name="Dashboard"
                component={Dashboard}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Icon name="heart" color={focused ? colors.primary : colors.disabled} size={25} />
                }}
                name="Favourites"
                component={Favourites}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation