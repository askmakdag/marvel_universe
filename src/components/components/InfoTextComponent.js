import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class InfoTextComponent extends Component {
  render() {
    const {label, text} = this.props;
    return (
      <View display={text ? 'flex' : 'none'}>
        <Text style={styles.textStyle}>{label + ' ' + text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {},
  textStyle: {
    backgroundColor: 'orange',
    fontSize: 13,
    // fontWeight: 'bold',
    padding: 5,
  },
});

export default InfoTextComponent;
