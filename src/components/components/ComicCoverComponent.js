import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {portrait} from '../../common/constants';
import _ from 'lodash';
import {styles} from '../styles/ComicCoverComponentStyles';
import InfoTextComponent from './InfoTextComponent';
import CacheImageComponent from './CacheImageComponent';

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
        <CacheImageComponent
          uri={`${comic?.thumbnail.path}/${portrait.uncanny}.${comic?.thumbnail.extension}`}
          style={styles.imageStyle}
        />
        <Text style={styles.comicTitleStyle}>{_.toUpper(comic?.title)}</Text>
        <View>
          <InfoTextComponent
            label={'Creator: '}
            text={comic?.creators?.items[0]?.name}
            textStyle={styles.creatorTextStyle}
          />
          <InfoTextComponent
            label={'Page Count: '}
            text={comic?.pageCount}
            textStyle={styles.textStyle}
          />
          <InfoTextComponent
            label={'Stories Count: '}
            text={comic?.stories?.available}
            textStyle={styles.textStyle}
          />
          <InfoTextComponent
            label={'Events Count: '}
            text={comic?.events?.available}
            textStyle={styles.textStyle}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default ComicCoverComponent;
