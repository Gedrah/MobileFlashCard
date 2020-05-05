import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

interface NewQuestionViewProps {
    navigation: any;
    route: any;
}

interface NewQuestionViewState {
    question: string,
    answer: string
}


export default class NewQuestionView extends Component<NewQuestionViewProps, NewQuestionViewState> {
    state: NewQuestionViewState = {
        question: '',
        answer: ''
    };

    getDecks(question: string, answer: string) {
        AsyncStorage.getItem('decks').then((datas: any) => {
            let decks = JSON.parse(datas);
            this.saveDecks(question, answer, decks);
        });
    }

    saveNewQuestionAnswer(question: string, answer: string) {
        if (question !== '' && answer !== '') {
            this.getDecks(question, answer);
        }
    }

    saveDecks(question: string, answer: string, decks: any) {
        let deck = this.props.route.params.deck;
        deck.questions.push({question: question, answer: answer});
        decks[deck.title] = deck;
        AsyncStorage.setItem('decks', JSON.stringify(decks)).then(() => {
            this.setState({question: '', answer: ''});
            this.props.navigation.navigate('Deck', {deck: deck});
        });
    }

    setQuestion(question: string) {
        this.setState({question: question})
    }

    setAnswer(answer: string) {
        this.setState({answer: answer})
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput value={this.state.question} style={styles.inputTextName} placeholder="question" onChangeText={text => this.setQuestion(text)}/>
                <TextInput value={this.state.answer} style={styles.inputTextName} placeholder="answer" onChangeText={text => this.setAnswer(text)}/>
                <TouchableOpacity style={styles.buttonSubmit} onPress={() => this.saveNewQuestionAnswer(this.state.question, this.state.answer)}>
                    <Text style={styles.textButtonSubmit}>Submit</Text>
                </TouchableOpacity>
                <View style={styles.spaceContainer}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    inputTextName: {
        borderColor: '#000',
        borderRadius: 5,
        borderWidth: 2,
        paddingLeft: 20,
        paddingTop: 10,
        width: 300,
        paddingBottom: 10,
        margin: 25
    },
    buttonSubmit: {
        borderRadius: 5,
        margin: 10,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        height: 60,
        fontSize: 25,
    },
    textButtonSubmit: {
        color: '#fff'
    },
    spaceContainer: {
        flex: 1,
    },
});
