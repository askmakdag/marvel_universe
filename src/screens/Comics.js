import React, {Component} from 'react';
import {FlatList, StyleSheet, View, Platform} from 'react-native';
import ComicService from '../services/api/ComicService';
import {get_comics} from '../store/Actions';
import {connect} from 'react-redux';
import ComicCoverComponent from '../components/ComicCoverComponent';
import {SearchBar} from 'react-native-elements';

class Comics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: false,
      refreshing: false,
      search_input: '',
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {data} = await ComicService.getComics();
    this.props.get_comics(data.data.results);
  };

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <SearchBar
          placeholder={'Search'}
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
          data={this.props.comics}
          renderItem={({item}) => (
            <ComicCoverComponent
              navigation={this.props.navigation}
              comic={item}
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
  inputContainerStyleIos: {
    backgroundColor: Platform.OS === 'ios' ? 'gray' : '#8f8f8f',
    alignSelf: 'center',
  },
  inputContainerStyleAndroid: {
    backgroundColor: Platform.OS === 'ios' ? 'gray' : '#8f8f8f',
    alignSelf: 'center',
    width: '96%',
    borderRadius: 7.5,
  },
  inputStyle: {
    height: 20,
    backgroundColor: '#8f8f8f',
  },
  inputTextStyle: {
    fontSize: 15,
    height: 35,
  },
});

const mapStateToProps = (state) => {
  return {
    comics: state.comicReducer.comics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_comics: (comics) => dispatch(get_comics(comics)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comics);
