import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from "./views/HomeView";
import DeckView from "./views/DeckView";
import NewQuestionView from "./views/NewQuestionView";
import QuizView from "./views/QuizView";
import {AsyncStorage} from "react-native";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="FlashCard">
                <Stack.Screen name="FlashCard" component={HomeView} />
                <Stack.Screen options={(option: any) => ({ title: option.route.params.deck.title })} name="Deck" component={DeckView} />
                <Stack.Screen name="Add Card" component={NewQuestionView} />
                <Stack.Screen name="Quiz" component={QuizView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



export default App;
