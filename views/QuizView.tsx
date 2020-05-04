import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface QuizViewProps {
    navigation: any,
    route: any
}

interface QuizViewState {
    currentCardNumber: 0
}

export default class QuizView extends Component<QuizViewProps, QuizViewState> {
    render() {
        const {route} = this.props;
        const deck = route.params.deck;
        const title = deck.questions[0].question;
        const numberOfCards = deck.questions.length;
        return (
            <View style={styles.container}>
                <View style={styles.cardLeftView}>
                    <Text style={{fontSize: 20}}>0 / {numberOfCards}</Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity  onPress={() => {}}>
                        <Text style={styles.getAnswer}>Answer ?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonCorrect} onPress={() => {}}>
                        <Text style={styles.textButtonAnswer}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonIncorrect} onPress={() => {{}}}>
                        <Text style={styles.textButtonAnswer}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardLeftView: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    getAnswer: {
        marginTop: 16,
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold'
    },
    questionContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCorrect: {
        borderRadius: 10,
        margin: 10,
        alignSelf: 'stretch',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        height: 60,
        fontSize: 25,
    },
    buttonIncorrect: {
        borderRadius: 10,
        margin: 10,
        alignSelf: 'stretch',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        height: 60,
        fontSize: 25,
    },
    textButtonAnswer: {
        color: '#fff'
    }
});
