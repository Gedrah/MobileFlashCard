import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface DeckCardProps {
    deck: any
}

export default class DeckCard extends Component<DeckCardProps> {

    openDeck() {
        console.log('open deck ' + this.props.deck.title);
    }

    render() {
        const {deck} = this.props;
        const title = deck.title;
        const numberOfCards = deck.questions.length;
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.openDeck()}>
                <Text style={styles.title}>{title}</Text>
                <Text>{numberOfCards} cards</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#FFF5EE',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        borderRadius: 5,
        border: 'solid 10px',
        width: '100%',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
