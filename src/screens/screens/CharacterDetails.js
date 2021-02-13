import React, {Component} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Linking} from 'react-native';
import AnimatedLoadingComponent from '../../components/components/AnimatedLoadingComponent';
import _ from 'lodash';
import ComicListComponent from '../../components/components/ComicListComponent';
import CharacterService from '../../services/api/CharacterService';
import {styles} from '../styles/CharacterDetailsStyles';
import CacheImageComponent from '../../components/components/CacheImageComponent';
import {portrait} from '../../common/constants';

class CharacterDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: {},
      page_loading: false,
      character_detail_page_url: '',
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {character} = this.props.route.params;
    this.props.navigation.setOptions({
      headerTitle: _.toUpper(character.name),
    });

    await this.getDetailPageUrl(character);
    await this.setState({page_loading: true});
    const {data} = await this.GetCharacterDetail(character.id);
    await this.setState({character: data.data.results[0]});
    await this.setState({page_loading: false});
  };

  getDetailPageUrl = async (character) => {
    const character_url = await character.urls.filter((url) => {
      return url.type === 'detail';
    });

    await this.setState({character_detail_page_url: character_url[0].url});
  };

  GetCharacterDetail = async (id) => {
    return await CharacterService.getCharacter({characterId: id});
  };

  OpenDetailPage = () => {
    const {character_detail_page_url} = this.state;
    if (character_detail_page_url) {
      Linking.openURL(character_detail_page_url);
    }
  };

  render() {
    const {character} = this.props.route.params;
    return this.state.page_loading ? (
      <AnimatedLoadingComponent />
    ) : (
      <ScrollView style={styles.containerStyle}>
        <View style={styles.topRowStyle}>
          <CacheImageComponent
            uri={`${character?.thumbnail?.path}/${portrait.uncanny}.${character?.thumbnail?.extension}`}
            style={styles.imageStyle}
          />
          <View style={styles.characterInfoTopRightStyle}>
            <Text style={styles.characterTitleStyle}>{character.name}</Text>
            <TouchableOpacity onPress={this.OpenDetailPage}>
              <Text style={styles.linkTextStyle}>
                Navigate To Character Detail Page
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.middleColumnStyle}>
          <View display={character.description ? 'flex' : 'none'}>
            <Text style={styles.characterTitleStyle}>SUMMARY</Text>
            <Text style={styles.characterDescriptionStyle}>
              {character.description}
            </Text>
          </View>
        </View>

        <ComicListComponent
          characterId={character?.id}
          navigation={this.props.navigation}
        />
      </ScrollView>
    );
  }
}

export default CharacterDetails;
