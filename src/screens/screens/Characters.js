import React, {Component} from 'react';
import {View, FlatList, Platform} from 'react-native';
import CharacterService from '../../services/api/CharacterService';
import {get_characters} from '../../store/Actions';
import {connect} from 'react-redux';
import CharacterCoverComponent from '../../components/components/CharacterCoverComponent';
import {SearchBar} from 'react-native-elements';
import {styles} from '../styles/CharactersStyles';
import AnimatedLoadingComponent from '../../components/components/AnimatedLoadingComponent';

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      search_input: '',
      page_loading: false,
      filtered_characters: [],
    };
  }

  UNSAFE_componentWillMount = async () => {
    await this.setState({page_loading: true});
    const {data} = await CharacterService.getCharacters();
    this.props.get_characters(data.data.results);
    await this.setState({page_loading: false});
  };

  onChangeText = async (key, value) => {
    this.setState({
      [key]: value,
    });
    await this.DoCharacterSearch(value);
  };

  DoCharacterSearch = async (search_input) => {
    const {characters} = this.props;
    const filtered_characters = characters.filter((character) => {
      return character.name.includes(search_input);
    });
    this.setState({filtered_characters: filtered_characters});
  };

  handleRefresh = () => {};

  render() {
    const {filtered_characters, search_input} = this.state;
    const {characters} = this.props;

    return (
      <View style={styles.mainContainerStyle}>
        <SearchBar
          placeholder={'Search'}
          onChangeText={(value) => this.onChangeText('search_input', value)}
          value={search_input}
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

        {this.state.page_loading ? (
          <AnimatedLoadingComponent />
        ) : (
          <FlatList
            data={search_input === '' ? characters : filtered_characters}
            renderItem={({item}) => (
              <CharacterCoverComponent
                navigation={this.props.navigation}
                character={item}
                name={item.name}
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
            numColumns={2}
          />
        )}
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
