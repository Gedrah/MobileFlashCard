import React from 'react';
import DeckListView from "./DeckListView";
import NewDeckView from "./NewDeckView";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionics from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function HomeView() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Decks List') {
                        iconName = focused
                            ? 'ios-list-box'
                            : 'ios-list';
                    } else if (route.name === 'New Deck') {
                        iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                    }

                    return <Ionics name={iconName} size={size} color={color} />;
                },
            })}

        >
            <Tab.Screen name="Decks List" component={DeckListView} />
            <Tab.Screen name="New Deck" component={NewDeckView} />
        </Tab.Navigator>
    );
}

export default HomeView;
