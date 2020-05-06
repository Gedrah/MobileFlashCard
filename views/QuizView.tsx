import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {clearNotification, clearScheduleNotification} from "../utils/notificationsHandler";

interface QuizViewProps {
    navigation: any,
    route: any
}

interface QuizViewState {
    currentCardNumber: number,
    showAnswer: boolean,
    score: number,
    showResult: boolean
}

export default class QuizView extends Component<QuizViewProps, QuizViewState> {
    state: QuizViewState =  {
        currentCardNumber: 0,
        showAnswer: false,
        score: 0,
        showResult: false
    };

    switchAnswerQuestion(showAnswer: boolean) {
        this.setState({showAnswer: !showAnswer})
    }

    nextQuestion(answer: string, numberOfCards: number) {
        let score = this.state.score;
        if (answer === 'correct') { score++; }
        if (this.state.currentCardNumber < numberOfCards - 1) {
            this.setState({currentCardNumber: this.state.currentCardNumber + 1, score: score})
        } else {
            clearScheduleNotification();
            clearNotification();
            this.setState({showResult: true, score: score});
        }
    }

    quizView(showAnswer: boolean, deck: any, currentCardNumber: number) {
        const question = deck.questions[currentCardNumber].question;
        const answer = deck.questions[currentCardNumber].answer;
        const numberOfCards = deck.questions.length;

        return (
            <View style={styles.container}>
                <View style={styles.cardLeftView}>
                    <Text style={{fontSize: 20}}>{currentCardNumber + 1} / {numberOfCards}</Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.title}>{showAnswer ? answer : question}</Text>
                    <TouchableOpacity  onPress={() => this.switchAnswerQuestion(showAnswer)}>
                        <Text style={styles.getAnswer}>Show Answer</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonCorrect} onPress={() => this.nextQuestion('correct', numberOfCards)}>
                        <Text style={styles.textButtonAnswer}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonIncorrect} onPress={() => this.nextQuestion('incorrect', numberOfCards)}>
                        <Text style={styles.textButtonAnswer}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    resultView(score: number, deck: any, navigation: any) {
        const numberOfCards = deck.questions.length;
        const percentageCorrectAnswer = (score / numberOfCards * 100).toFixed(0);

        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Text style={styles.title}>Score</Text>
                    <Text style={styles.score}>{percentageCorrectAnswer} %</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonRestartQuiz} onPress={() => this.restartQuiz()}>
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonBackToDeck} onPress={() => navigation.navigate('Deck', {deck: deck})}>
                        <Text style={styles.textButtonAnswer}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    restartQuiz() {
        this.setState({
            currentCardNumber: 0,
            showAnswer: false,
            score: 0,
            showResult: false
        });
    }

    render() {
        const {route, navigation} = this.props;
        const {showAnswer, currentCardNumber, showResult, score} = this.state;
        const deck = route.params.deck;
        return (
            <View style={styles.container}>
                {
                    showResult ?
                        this.resultView(score, deck, navigation)
                        : this.quizView(showAnswer, deck, currentCardNumber)
                }
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
    score: {
        marginTop: 16,
        fontSize: 24,
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
    },
    buttonRestartQuiz: {
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
    buttonBackToDeck: {
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
});
