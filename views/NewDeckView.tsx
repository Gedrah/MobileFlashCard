import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default class NewDeckView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello, I am your class!</Text>
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
