import React, {Component} from 'react';
import {View, Text} from 'react-native';

class InfoTextComponent extends Component {
  render() {
    const {label, text, textStyle = {}} = this.props;
    return (
      <View display={text ? 'flex' : 'none'}>
        <Text style={textStyle}>{label + ' ' + text}</Text>
      </View>
    );
  }
}

export default InfoTextComponent;
