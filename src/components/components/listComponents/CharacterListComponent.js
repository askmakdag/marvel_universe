import React, {Component} from 'react';
import {
  FlatList,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CacheImageComponent from '../CacheImageComponent';
import {DEVICE_WIDTH, portrait} from '../../../common/constants';
import ComicService from '../../../services/api/ComicService';

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
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTextStyle}>CHARACTERS</Text>
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
            <View style={styles.listItemContainerStyle}>
              <View style={styles.listItemStyle}>
                <TouchableOpacity onPress={() => this.navigateToDetails(item)}>
                  <CacheImageComponent
                    uri={`${item?.thumbnail?.path}/${portrait.uncanny}.${item?.thumbnail?.extension}`}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>

                <ScrollView style={styles.descriptionContainerStyle}>
                  <Text style={styles.titleStyle}>{item.name}</Text>
                  <Text style={styles.descriptionStyle}>
                    {item.description}
                  </Text>
                </ScrollView>
              </View>
            </View>
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
  headerContainerStyle: {
    paddingVertical: 5,
    marginBottom: 5,
    borderBottomWidth: 2,
    borderColor: 'orange',
  },
  headerTextStyle: {
    fontWeight: 'bold',
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
    width: DEVICE_WIDTH * 0.6,
    marginLeft: DEVICE_WIDTH * 0.025,
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
  },
});

export default CharacterListComponent;
