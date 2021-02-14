import React, {Component} from 'react';
import {
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
      items: [],
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {comicId} = this.props;
    await this.getCharacters(comicId);
  };

  getCharacters = async (comicId) => {
    const {data} = await ComicService.getCharactersOfComic({comicId});
    await this.fillScrollView(data.data.results);
  };

  navigateToDetails = (character) => {
    this.props.navigation.push('CharacterDetails', {
      character: character,
    });
  };

  fillScrollView = async (items) => {
    let scroll_images = [];

    if (items) {
      await items.forEach((item, index) => {
        scroll_images.push(
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
                <Text style={styles.descriptionStyle}>{item.description}</Text>
              </ScrollView>
            </View>
          </View>,
        );
      });
    }

    await this.setState({items: scroll_images});
  };

  render() {
    const {items} = this.state;
    return (
      <View display={items?.length === 0 ? 'none' : 'flex'}>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.headerTextStyle}>CHARACTERS</Text>
        </View>

        <ScrollView
          horizontal={true}
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}>
          {items}
        </ScrollView>
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
    color: '#10589f',
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
