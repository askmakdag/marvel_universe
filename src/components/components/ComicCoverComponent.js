import React, {Component} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {portrait} from '../../common/constants';
import _ from 'lodash';
import {styles} from '../styles/ComicCoverComponentStyles';

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

export default ComicCoverComponent;
