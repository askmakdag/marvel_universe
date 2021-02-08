import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DEVICE_WIDTH} from '../common/constants';

class CharacterCoverComponent extends Component {
  navigateToDetails = () => {
    this.props.navigation.push('CharacterDetails');
  };

  render() {
    const {uri, name} = this.props;
    return (
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={this.navigateToDetails}>
        <Image style={styles.imageStyle} source={{uri: uri}} />
        <Text style={styles.characterNameStyle}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.3,
    marginHorizontal: (DEVICE_WIDTH * 0.1) / 6,
    marginVertical: 2.5,
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.325 * 4) / 3,
    width: DEVICE_WIDTH * 0.3,
  },
  characterNameStyle: {
    fontWeight: 'bold',
    marginTop: 5,
    height: 50,
  },
});

export default CharacterCoverComponent;
