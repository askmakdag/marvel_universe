import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {standard} from '../../common/constants';
import {styles} from '../styles/CharacterCoverComponentStyles';
import InfoTextComponent from './InfoTextComponent';
import CacheImageComponent from './CacheImageComponent';

class CharacterCoverComponent extends Component {
  navigateToDetails = (character) => {
    this.props.navigation.push('CharacterDetails', {
      character: character,
    });
  };

  render() {
    const {character} = this.props;
    return (
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={() => this.navigateToDetails(character)}>
        <CacheImageComponent
          uri={`${character?.thumbnail.path}/${standard.xlarge}.${character?.thumbnail.extension}`}
          style={styles.imageStyle}
        />
        <Text style={styles.characterNameStyle}>{character.name}</Text>
        <View>
          <InfoTextComponent
            label={'Stories Count:  '}
            text={character?.stories?.available}
          />

          <InfoTextComponent
            label={'Series Count:   '}
            text={character?.series?.available}
          />

          <InfoTextComponent
            label={'Comics Count: '}
            text={character?.comics?.available}
          />

          <InfoTextComponent
            label={'Events Count:  '}
            text={character?.events?.available}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default CharacterCoverComponent;
