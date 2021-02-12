import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {standard} from '../../common/constants';
import _ from 'lodash';
import {styles} from '../styles/CharacterCoverComponentStyles';
import InfoTextComponent from './InfoTextComponent';

class CharacterCoverComponent extends Component {
  navigateToDetails = (title) => {
    this.props.navigation.push('CharacterDetails', {
      header_title: _.toUpper(title),
    });
  };

  render() {
    const {character} = this.props;
    return (
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={() => this.navigateToDetails(character.name)}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: `${character?.thumbnail.path}/${standard.xlarge}.${character?.thumbnail.extension}`,
          }}
        />
        <Text style={styles.characterNameStyle}>{character.name}</Text>
        <View>
          <InfoTextComponent
            label={'Stories'}
            text={character?.stories?.available}
          />

          <InfoTextComponent
            label={'Series'}
            text={character?.series?.available}
          />

          <InfoTextComponent
            label={'Comics'}
            text={character?.comics?.available}
          />

          <InfoTextComponent
            label={'Events'}
            text={character?.events?.available}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default CharacterCoverComponent;
