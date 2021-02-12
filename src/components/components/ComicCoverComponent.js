import React, {Component} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {portrait} from '../../common/constants';
import _ from 'lodash';
import {styles} from '../styles/ComicCoverComponentStyles';
import InfoTextComponent from './InfoTextComponent';

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
        <View>
          <InfoTextComponent
            label={'Creator'}
            text={comic?.creators?.items[0]?.name}
          />
          <InfoTextComponent label={'Page Count'} text={comic?.pageCount} />
          <InfoTextComponent
            label={'Stories'}
            text={comic?.stories?.available}
          />
          <InfoTextComponent label={'Events'} text={comic?.events?.available} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default ComicCoverComponent;
