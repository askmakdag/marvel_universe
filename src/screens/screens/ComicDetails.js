import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import {portrait} from '../../common/constants';
import _ from 'lodash';
import ComicService from '../../services/api/ComicService';
import HorizontalScrollImages from '../../components/HorizontalScrollImages';
import {styles} from '../styles/ComicDetailsStyles';

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
          <View display={comic.description ? 'flex' : 'none'}>
            <Text style={styles.comicTitleStyle}>SUMMARY</Text>
            <Text style={styles.comicDescriptionStyle}>
              {comic.description}
            </Text>
          </View>
          <HorizontalScrollImages
            title={'COMIC COVER HISTORY'}
            images={comic.images}
          />
        </View>
      </View>
    );
  }
}

export default ComicDetails;
