import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';


export default class NewDeckView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.newDeckContainer}>
                    <Text style={styles.title}>What is the title of your new deck ?</Text>
                    <TextInput style={styles.inputTextName} placeholder="New deck"/>
                    <TouchableOpacity style={styles.buttonSubmit} onPress={() => {}}>
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
