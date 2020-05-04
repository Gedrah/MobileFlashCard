import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';


export default class NewQuestionView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputTextName} placeholder="question"/>
                <TextInput style={styles.inputTextName} placeholder="answer"/>
                <TouchableOpacity style={styles.buttonSubmit} onPress={() => {}}>
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
