import React, {Component} from 'react';
import {Image, View, Text, ScrollView} from 'react-native';
import {portrait} from '../../common/constants';
import _ from 'lodash';
import ComicService from '../../services/api/ComicService';
import HorizontalScrollImages from '../../components/components/HorizontalScrollImages';
import {styles} from '../styles/ComicDetailsStyles';
import AnimatedLoadingComponent from '../../components/components/AnimatedLoadingComponent';

class ComicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: {},
      page_loading: false,
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {comic} = await this.props.route.params;
    this.props.navigation.setOptions({
      headerTitle: _.toUpper(comic.title),
    });

    await this.setState({page_loading: true});
    const {data} = await this.GetComicDetail({comicId: comic.id});
    await this.setState({comic: data.data.results[0]});
    await this.setState({page_loading: false});
  };

  GetComicDetail = async (id) => {
    return await ComicService.getComic(id);
  };

  render() {
    const {comic} = this.state;
    return this.state.page_loading ? (
      <AnimatedLoadingComponent />
    ) : (
      <ScrollView style={styles.containerStyle}>
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
      </ScrollView>
    );
  }
}

export default ComicDetails;
