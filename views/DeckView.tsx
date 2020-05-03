import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface DeckViewProps {
    route: any
}

export default class DeckView extends Component<DeckViewProps> {
    render() {
        const {route} = this.props;
        const deck = route.params.deck;
        return (
            <View style={styles.container}>
                <Text>Deck : {deck.title}</Text>
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
});
