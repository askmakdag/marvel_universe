import React, {Component} from 'react';
import {FlatList, View, Platform} from 'react-native';
import ComicService from '../../services/api/ComicService';
import {get_comics, add_comics} from '../../store/Actions';
import {connect} from 'react-redux';
import ComicCoverComponent from '../../components/components/ComicCoverComponent';
import {SearchBar} from 'react-native-elements';
import {styles} from '../styles/ComicsStyles';
import AnimatedLoadingComponent from '../../components/components/AnimatedLoadingComponent';

class Comics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      search_input: '',
      page_loading: false,
      filtered_comics: [],
      page: 0,
      limit: 20,
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {page, limit} = this.state;
    await this.setState({page_loading: true});
    const {data} = await ComicService.getComics({offset: page, limit});
    await this.props.get_comics(data.data.results);
    await this.setState({page_loading: false, page: page + 1});
  };

  DoComicSearch = async (search_input) => {
    const {comics} = this.props;
    const filtered_comics = comics.filter((comic) => {
      return comic.title.includes(search_input);
    });
    this.setState({filtered_comics: filtered_comics});
  };

  onChangeText = async (key, value) => {
    this.setState({
      [key]: value,
    });
    await this.DoComicSearch(value);
  };

  handleLoadMore = async () => {
    const {page, limit, search_input} = this.state;
    if (search_input === '') {
      const {data} = await ComicService.getComics({
        offset: page * limit,
        limit,
      });
      this.setState({page: page + 1});
      await this.props.add_comics(data.data.results);
    }
  };

  handleRefresh = async () => {
    const {limit} = this.state;
    const {data} = await ComicService.getComics({offset: 0, limit});
    this.props.get_comics(data.data.results);
    await this.setState({page: 1});
  };

  render() {
    const {search_input, filtered_comics} = this.state;
    const {comics} = this.props;
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
            data={search_input === '' ? comics : filtered_comics}
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
            onEndReached={this.handleLoadMore}
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
    comics: state.comicReducer.comics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_comics: (comics) => dispatch(get_comics(comics)),
    add_comics: (comics) => dispatch(add_comics(comics)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comics);
