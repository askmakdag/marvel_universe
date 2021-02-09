import React, {Component} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {DEVICE_WIDTH, portrait} from '../common/constants';
import _ from 'lodash';
import ComicService from '../services/api/ComicService';
import HorizontalScrollImages from '../components/HorizontalScrollImages';

class ComicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: {},
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {comic} = await this.props.route.params;
    this.props.navigation.setOptions({
      headerTitle: _.toUpper(comic.title),
    });

    const {data} = await this.GetComicDetail({comicId: comic.id});
    this.setState({comic: data.data.results[0]});
  };

  GetComicDetail = async (id) => {
    return await ComicService.getComic(id);
  };

  render() {
    const {comic} = this.state;
    return (
      <View style={styles.containerStyle}>
        <View style={styles.topRowStyle}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: `${comic?.thumbnail?.path}/${portrait.uncanny}.${comic?.thumbnail?.extension}`,
            }}
          />
          <View style={styles.comicInfoTopRightStyle}>
            <Text style={styles.comicTitleStyle}>{comic.title}</Text>
            <Text style={styles.comicInfoStyle}>
              {'Pages: ' + comic.pageCount}
            </Text>
          </View>
        </View>

        <View style={styles.middleColumnStyle}>
          <Text style={styles.comicTitleStyle}>SUMMARY</Text>
          <Text style={styles.comicDescriptionStyle}>{comic.description}</Text>

          <HorizontalScrollImages images={comic.images} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    margin: '2%',
  },
  topRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middleColumnStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  comicInfoTopRightStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: DEVICE_WIDTH * 0.6,
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
    width: DEVICE_WIDTH * 0.35,
  },
  comicTitleStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 7.5,
    paddingTop: 5,
  },
  comicInfoStyle: {
    fontSize: 15,
    marginHorizontal: 7.5,
    paddingTop: 5,
  },
  comicDescriptionStyle: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

export default ComicDetails;
