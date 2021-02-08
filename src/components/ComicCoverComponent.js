import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {DEVICE_WIDTH} from '../common/constants';

class ComicCoverComponent extends Component {
  navigateToDetails = (title) => {
    this.props.navigation.push('ComicDetails', {
      header_title: title,
    });
  };

  render() {
    const {uri, title} = this.props;
    return (
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={() => this.navigateToDetails(title)}>
        <Image style={styles.imageStyle} source={{uri: uri}} />
        <Text style={styles.comicTitleStyle}>{title}</Text>
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
  comicTitleStyle: {
    fontWeight: 'bold',
    marginTop: 5,
    height: 50,
  },
});

export default ComicCoverComponent;
