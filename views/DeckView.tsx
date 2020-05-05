import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function DeckView(props: any) {
        const navigation = useNavigation();
        const {route} = props;
        const deck = route.params.deck;
        const title = deck.title;
        const numberOfCards = deck.questions.length;
        return (
            <View style={styles.container}>
                <View style={styles.deckContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.numberOfCards}>{numberOfCards} cards</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonAddCard} onPress={() => navigation.navigate('Add Card', {deck: deck})}>
                        <Text>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={numberOfCards === 0}
                                      style={numberOfCards === 0 ? styles.buttonStartQuizDisabled : styles.buttonStartQuiz}
                                      onPress={() => navigation.navigate('Quiz', {deck: deck})}>
                        <Text style={styles.textStartQuiz}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold'
    },
    numberOfCards: {
        fontSize: 30,
        color: 'gray'
    },
    deckContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAddCard: {
        borderRadius: 5,
        margin: 10,
        alignSelf: 'stretch',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderColor: '#000',
        height: 60,
        fontSize: 25,
        borderStyle: 'solid',
        borderWidth: 1
    },
    buttonStartQuiz: {
        borderRadius: 5,
        margin: 10,
        alignSelf: 'stretch',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        height: 60,
        fontSize: 25,
    },
    buttonStartQuizDisabled: {
        borderRadius: 5,
        margin: 10,
        alignSelf: 'stretch',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        height: 60,
        fontSize: 25,
    },
    textStartQuiz: {
        color: '#fff'
    }
});
