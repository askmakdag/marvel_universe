import React, {Component} from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CacheImageComponent from './CacheImageComponent';
import {DEVICE_WIDTH, portrait} from '../../common/constants';
import ComicService from '../../services/api/ComicService';

class CharacterListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      characters: [],
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {comicId} = this.props;
    const {data} = await ComicService.getCharactersOfComic({comicId});
    this.setState({characters: data.data.results});
    console.log('data: ', data);
  };

  renderHeader = () => {
    return (
      <View>
        <Text>Characters</Text>
      </View>
    );
  };

  navigateToDetails = (character) => {
    this.props.navigation.push('CharacterDetails', {
      character: character,
    });
  };

  render() {
    const {characters} = this.state;
    return (
      <View display={characters?.length === 0 ? 'none' : 'flex'}>
        <FlatList
          data={characters}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.navigateToDetails(item)}>
              <View
                style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <CacheImageComponent
                  uri={`${item?.thumbnail?.path}/${portrait.uncanny}.${item?.thumbnail?.extension}`}
                  style={styles.imageStyle}
                />
                <Text style={styles.descriptionStyle}>{item.description}</Text>
              </View>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={(item) => item.id}
          refreshing={this.state.refreshing}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1}}
          onEndReachedThreshold={1}
          initialNumToRender={1}
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
    width: DEVICE_WIDTH * 0.35,
  },
  descriptionStyle: {
    width: DEVICE_WIDTH * 0.6,
    marginLeft: DEVICE_WIDTH * 0.025,
    maxHeight: (DEVICE_WIDTH * 0.35 * 3) / 2,
  },
});

export default CharacterListComponent;
