import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import {
  addCardToDeck,
  getDeck,
  getDecks,
  saveDeckTitle,
} from '../../utils/helpers';

class Decks extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.dataSource}
          renderItem={({item}) =>
            <RowData deck={item} pressed={() =>
              this.props.navigation.navigate('Deck', {deck: item})}/>}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

const mapStateToProps = ({dataSource}) => {
  console.log(dataSource);
  return {dataSource};
}
export default connect(mapStateToProps)(Decks);

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
