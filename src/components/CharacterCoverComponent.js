import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

class CharacterCoverComponent extends Component {
  navigateToDetails = () => {
    this.props.navigation.push('CharacterDetails');
  };

  render() {
    const {uri} = this.props;
    return (
      <TouchableOpacity onPress={this.navigateToDetails}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: uri,
          }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    height: 350,
    width: 350,
    backgroundColor: 'gray',
    marginVertical: 2.5,
  },
});

export default CharacterCoverComponent;
