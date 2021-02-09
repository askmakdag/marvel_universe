import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import CharacterService from '../services/api/CharacterService';
import {get_characters} from '../store/Actions';
import {connect} from 'react-redux';
import {standard} from '../common/constants';
import CharacterCoverComponent from '../components/CharacterCoverComponent';

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: false,
      refreshing: false,
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {data} = await CharacterService.getCharacters();
    this.props.get_characters(data.data.results);
  };

  handleRefresh = () => {};

  render() {
    return (
      <View style={styles.mainContainerStyle}>
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

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
