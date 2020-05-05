import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';


interface NewDeckViewProps {
    navigation: any;
}

interface NewDeckViewState {
    title: string
}

export default class NewDeckView extends Component<NewDeckViewProps, NewDeckViewState> {
    state: NewDeckViewState = {
        title: '',
    };

    getDecks(title: string) {
        try {
            AsyncStorage.getItem('decks').then((datas: any) => {
                if (datas) {
                    let decks = JSON.parse(datas);
                    if (this.checkIfDeckIsValid(title, decks)) {
                        this.saveDecks(title, decks);
                    }
                } else {
                    this.saveDecks(title, {});
                }
            });
        } catch(error) {
            console.log(error);
        }
    }

    checkIfDeckIsValid(title: string, decks: object) : boolean {
        if (!title || title === '') {
            return false;
        }
        let isNameAlreadyTaken = false;
        Object.keys(decks).map((deckName: string) => {
            if (title === deckName)
                isNameAlreadyTaken = true;
        });
        return !isNameAlreadyTaken;
    }

    saveNewDeck(deckTitle: string) {
        this.getDecks(deckTitle);
    }

    saveDecks(title: string, decks: any) {
        decks[title] = {
            title: title,
            questions: []
        };
        try {
            AsyncStorage.setItem('decks', JSON.stringify(decks)).then(() => {
                this.setState({title: ''});
                this.props.navigation.goBack();
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    setDeckTitle(title: string) {
        this.setState({title: title});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.newDeckContainer}>
                    <Text style={styles.title}>What is the title of your new deck ?</Text>
                    <TextInput value={this.state.title} style={styles.inputTextName} placeholder="New deck" onChangeText={text => this.setDeckTitle(text)}/>

                    <TouchableOpacity style={styles.buttonSubmit} onPress={() => this.saveNewDeck(this.state.title)}>
                        <Text style={styles.textButtonSubmit}>Submit</Text>
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
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
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
    newDeckContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
