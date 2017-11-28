import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  } from 'react-native';

export default class Decks extends React.Component {
  state = {
    dataSource: [
      { title: 'deck 1', cards: '3' },
      { title: 'deck 2', cards: '8' },
      { title: 'deck 3', cards: '23' },
      { title: 'deck 4', cards: '3' },
      { title: 'deck 5', cards: '8' },
      { title: 'deck 6', cards: '23' },
      { title: 'deck 7', cards: '3' },
      { title: 'deck 8', cards: '8' },
      { title: 'deck 9', cards: '23' },
    ],
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =>
            <RowData deck={item} pressed={() =>
              this.props.navigation.navigate('Deck', {deck: item})}/>}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

function RowData({deck, pressed}) {
  return (<TouchableOpacity style={styles.rowData} onPress={pressed}>
    <View style={styles.rowData2}>
      <Text style={styles.deck}>{deck.title}</Text>
      <Text style={styles.cards}>{deck.cards} cards</Text>
    </View>
  </TouchableOpacity>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowData: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowData2: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  deck: {
    fontSize: 36,
  },
  cards: {
    fontSize: 16,
    color: 'gray',
  },
});
