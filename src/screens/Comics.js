import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ComicService from '../services/api/ComicService';
import {get_comics} from '../store/Actions';
import {connect} from 'react-redux';
import {standard} from '../common/constants';
import ComicCoverComponent from '../components/ComicCoverComponent';

class Comics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: false,
      refreshing: false,
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {data} = await ComicService.getComics();
    this.props.get_comics(data.data.results);
  };

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <FlatList
          data={this.props.comics}
          renderItem={({item}) => (
            <ComicCoverComponent
              navigation={this.props.navigation}
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
    comics: state.comicReducer.comics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_comics: (comics) => dispatch(get_comics(comics)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comics);
