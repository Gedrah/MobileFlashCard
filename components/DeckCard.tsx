import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DeckCard(props: any) {
    const navigation = useNavigation();
    const title = props.deck.title;
    const numberOfCards = props.deck.questions.length;
    return (
        <TouchableOpacity style={styles.container}
                          onPress={() => navigation.navigate('Deck', {deck: props.deck})}>
            <Text style={styles.title}>{title}</Text>
            <Text>{numberOfCards} cards</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#FFF5EE',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 50,
        borderRadius: 5,
        alignSelf: 'stretch',
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
        margin: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
