import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from "./views/HomeView";
import DeckView from "./views/DeckView";
import NewQuestionView from "./views/NewQuestionView";
import QuizView from "./views/QuizView";
import Ionics from 'react-native-vector-icons/Ionicons';
import {Alert, AsyncStorage, StyleSheet, View} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import clearNotification from "./utils/notificationsHandler";
import registerForPushNotificationsAsync from "./utils/notificationsHandler";

const Stack = createStackNavigator();

interface AppState {
    date: any,
    showDate: boolean
    mode: any
}

class App extends React.Component<any, AppState> {
    state: AppState = {
        date: new Date(),
        showDate: false,
        mode: 'time'
    };

    setDate(event: any, date: any) {
        if (date !== undefined) {
            if (this.state.mode === 'date') {
                this.setState({date: date, showDate: true, mode: 'time'});
            } else {
                const dateToSave = new Date(this.state.date);
                const dateWithHours = new Date(date);
                dateToSave.setHours(dateWithHours.getHours());
                dateToSave.setMinutes(dateWithHours.getMinutes());
                AsyncStorage.setItem('date', JSON.stringify(dateToSave)).then(() => {
                    clearNotification();
                    registerForPushNotificationsAsync();
                    this.setState({date: date, showDate: false, mode: 'date'});
                });
            }
        }
    }

    createAlert() {
        Alert.alert(
            'Set Notification',
            'Set date and time for notification',
            [
                {text: 'Enter Date', onPress: () => this.setState({showDate: true, mode: 'date'})},
                {text: 'Cancel'}
            ],
            {cancelable: false},
        );
    }

    render() {
        return (
            <NavigationContainer>
                {
                    this.state.showDate && <RNDateTimePicker
                        style={{width: 200}}
                        mode={this.state.mode}
                        onChange={(event, date) => { this.setDate(event, date)}}
                        value={this.state.date}/>
                }
                <Stack.Navigator initialRouteName="FlashCard">
                    <Stack.Screen name="FlashCard" component={HomeView}
                                  options={{headerRight: () => (
                                          <View>
                                              <Ionics onPress={() => this.createAlert()}
                                                      style={styles.settingsButton} name={'md-settings'} size={30} />
                                          </View>
                                     )}}/>
                    <Stack.Screen options={(option: any) => ({ title: option.route.params.deck.title })} name="Deck" component={DeckView} />
                    <Stack.Screen name="Add Card" component={NewQuestionView} />
                    <Stack.Screen name="Quiz" component={QuizView} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    settingsButton: {
        marginRight: 16
    },
});



export default App;
