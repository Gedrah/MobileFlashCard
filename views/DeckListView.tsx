import React, {Component} from 'react';
import {AsyncStorage, ScrollView, StyleSheet, View} from 'react-native';
import DeckCard from "../components/DeckCard";


interface DeckListViewState {
    decks: any,
}

export default class DeckListView extends Component<any, DeckListViewState> {
    state: DeckListViewState = {
        decks: {},
    };

    focusSubscription: any;

    getDecks() {
        AsyncStorage.getItem('decks').then((decks) => {
            if (decks) {
                this.setState({decks: JSON.parse(decks)});
            } else {
                this.setState({decks: {}});
            }
        });
    };

    componentDidMount() {
        this.getDecks();
        this.focusSubscription = this.props.navigation.addListener('focus', () => {
            this.getDecks();
        });
    }

    componentWillUnmount() {
        this.focusSubscription.remove();
    }

    render() {
        const decks = this.state.decks;

        return (
            <View style={styles.container}>
                {
                    decks ?
                    <ScrollView style={styles.scrollView}>
                        {Object.keys(decks).map((deckName: string) => {
                            return <DeckCard key={deckName} deck={decks[deckName]} />
                        })}
                    </ScrollView> : ''
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
        alignSelf: 'stretch',
    },
    scrollView: {
        alignSelf: 'stretch',
    }
});
