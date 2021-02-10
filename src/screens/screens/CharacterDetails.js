import React, {Component} from 'react';
import {View} from 'react-native';

class CharacterDetails extends Component {
  UNSAFE_componentWillMount() {
    const {header_title} = this.props.route.params;
    this.props.navigation.setOptions({
      headerTitle: header_title,
    });
  }

  render() {
    return <View />;
  }
}

export default CharacterDetails;
