import React, {Component} from 'react';
import {View, FlatList, Platform} from 'react-native';
import CharacterService from '../../services/api/CharacterService';
import {get_characters} from '../../store/Actions';
import {connect} from 'react-redux';
import {standard} from '../../common/constants';
import CharacterCoverComponent from '../../components/CharacterCoverComponent';
import {SearchBar} from 'react-native-elements';
import {styles} from '../styles/CharactersStyles';

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: false,
      refreshing: false,
      search_input: '',
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {data} = await CharacterService.getCharacters();
    this.props.get_characters(data.data.results);
  };

  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }

  handleRefresh = () => {};

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <SearchBar
          placeholder={'Search'}
          onChangeText={(value) => this.onChangeText('search_input', value)}
          value={this.state.search_input}
          inputContainerStyle={styles.inputStyle}
          containerStyle={
            Platform.OS === 'android'
              ? styles.inputContainerStyleAndroid
              : styles.inputContainerStyleIos
          }
          inputStyle={styles.inputTextStyle}
          platform={Platform.OS}
          placeholderTextColor={styles.placeholderTextColor}
          onCancel={() => this.setState({search_input: ''})}
          autoFocus={false}
          cancelButtonTitle={'cancel'}
        />

        <FlatList
          data={this.props.characters}
          renderItem={({item}) => (
            <CharacterCoverComponent
              navigation={this.props.navigation}
              name={item.name}
              uri={`${item?.thumbnail.path}/${standard.xlarge}.${item?.thumbnail.extension}`}
            />
          )}
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          keyExtractor={(item) => item.id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1}}
          onEndReachedThreshold={1}
          initialNumToRender={1}
          numColumns={3}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    characters: state.characterReducer.characters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_characters: (characters) => dispatch(get_characters(characters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Characters);
