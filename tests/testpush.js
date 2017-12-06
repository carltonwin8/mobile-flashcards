import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as helpers from '../utils/helpers';

/**
 * UI for interactively developing/testing local push notifications
 * Not used in the released application.
 */
export default class TestPush extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={helpers.setLocalNotification}>
          <Text>P Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={helpers.clearLocalNotification}>
          <Text>P Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
