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
import CharacterService from '../../../services/api/CharacterService';

class ComicListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      comics: [],
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {characterId} = this.props;
    console.log('characterId: ', characterId);
    const {data} = await CharacterService.getComicsOfCharacter({characterId});
    this.setState({comics: data.data.results});
  };

  renderHeader = () => {
    return (
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTextStyle}>COMICS</Text>
      </View>
    );
  };

  navigateToDetails = (comic) => {
    this.props.navigation.push('ComicDetails', {
      comic: comic,
    });
  };

  render() {
    const {comics} = this.state;
    return (
      <View
        style={styles.containerStyle}
        display={comics?.length === 0 ? 'none' : 'flex'}>
        <FlatList
          data={comics}
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
                  <Text style={styles.titleStyle}>{item?.title}</Text>
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
  containerStyle: {
    marginVertical: 10,
  },
  listItemContainerStyle: {
    marginVertical: 5,
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
    paddingHorizontal: 5,
    flex: 2,
  },
  descriptionStyle: {
    marginTop: 5,
    paddingRight: 5,
    flex: 9,
  },
  descriptionContainerStyle: {
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    width: DEVICE_WIDTH * 0.6,
    marginLeft: DEVICE_WIDTH * 0.025,
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
  },
});

export default ComicListComponent;
