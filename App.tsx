import React from 'react';
import { StyleSheet, View } from 'react-native';
import DeckListView from "./views/DeckListView";

export default function App() {
  return (
    <View >
      <DeckListView/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
