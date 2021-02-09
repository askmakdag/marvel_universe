import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {DEVICE_WIDTH, portrait} from '../common/constants';
import _ from 'lodash';

class ComicCoverComponent extends Component {
  navigateToDetails = (comic) => {
    this.props.navigation.push('ComicDetails', {
      comic: comic,
    });
  };

  render() {
    const {comic} = this.props;
    return (
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={() => this.navigateToDetails(comic)}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: `${comic?.thumbnail.path}/${portrait.uncanny}.${comic?.thumbnail.extension}`,
          }}
        />
        <Text style={styles.comicTitleStyle}>{_.toUpper(comic?.title)}</Text>
        <View style={styles.coverInfoStyle}>
          <Text>{'Page Count: ' + comic?.pageCount}</Text>
          <Text>{'Creator: ' + comic?.creators?.items[0]?.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.45,
    marginHorizontal: (DEVICE_WIDTH * 0.1) / 6,
    marginVertical: 5,
    backgroundColor: 'black',
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.45 * 3) / 2,
    width: DEVICE_WIDTH * 0.45,
  },
  comicTitleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    marginHorizontal: 7.5,
    paddingTop: 5,
  },
  coverInfoStyle: {
    backgroundColor: 'orange',
    fontSize: 13,
    fontWeight: 'bold',
    padding: 5,
  },
});

export default ComicCoverComponent;
