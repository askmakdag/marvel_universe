import React, {Component} from 'react';
import {FlatList, View, Platform} from 'react-native';
import ComicService from '../../services/api/ComicService';
import {get_comics} from '../../store/Actions';
import {connect} from 'react-redux';
import ComicCoverComponent from '../../components/components/ComicCoverComponent';
import {SearchBar} from 'react-native-elements';
import {styles} from '../styles/ComicsStyles';

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

  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }

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
