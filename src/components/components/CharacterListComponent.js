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
            <TouchableOpacity
              style={styles.listItemContainerStyle}
              onPress={() => this.navigateToDetails(item)}>
              <View style={styles.listItemStyle}>
                <CacheImageComponent
                  uri={`${item?.thumbnail?.path}/${portrait.uncanny}.${item?.thumbnail?.extension}`}
                  style={styles.imageStyle}
                />
                <View style={styles.descriptionContainerStyle}>
                  <Text style={styles.titleStyle}>{item.name}</Text>
                  <Text style={styles.descriptionStyle}>
                    {item.description}
                  </Text>
                </View>
              </View>
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
  listItemContainerStyle: {
    marginVertical: 5,
  },
  listItemStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
    width: DEVICE_WIDTH * 0.35,
  },
  titleStyle: {
    fontWeight: 'bold',
    marginLeft: 5,
    flex: 2,
  },
  descriptionStyle: {
    marginTop: 5,
    paddingRight: 5,
    flex: 9,
  },
  descriptionContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: DEVICE_WIDTH * 0.6,
    marginLeft: DEVICE_WIDTH * 0.025,
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
  },
});

export default CharacterListComponent;
