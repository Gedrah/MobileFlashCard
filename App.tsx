import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from "./views/HomeView";
import DeckView from "./views/DeckView";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="FlashCard">
                <Stack.Screen name="FlashCard" component={HomeView} />
                <Stack.Screen name="Deck" component={DeckView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
