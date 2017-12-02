import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import * as helpers from '../../utils/helpers';
import * as decksActions from './decks-actions';

class Decks extends React.Component {
  componentDidMount = () => {
    helpers.getDecks().then(data => data && this.props.addDecks(data));
  }
  render = () => {
    if (this.props.dataSource && this.props.dataSource.length > 0) {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.props.dataSource}
            renderItem={({item}) =>
              <RowData deck={item} pressed={() =>
                this.props.navigation.navigate('Deck', {deck: item})}/>}
                keyExtractor={(item, index) => index}
            />
        </View>
      );
    } else {
      return (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No decks available at present.
          </Text>
          <Text style={styles.emptyText}>
            Use the "ADD DECK" tab to add a deck.
          </Text>
        </View>
      );
    }

  }
}

const mapStateToProps = ({dataSource}) => ({dataSource});
export default connect(mapStateToProps, {...decksActions})(Decks);

function RowData({deck, pressed}) {
  return (<TouchableOpacity style={styles.rowData} onPress={pressed}>
    <View style={styles.rowData2}>
      <Text style={styles.deck}>{deck.title}</Text>
      <Text style={styles.cards}>{deck.questions ? deck.questions.length : 0} cards</Text>
    </View>
  </TouchableOpacity>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 24,
    textAlign: 'center',
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
