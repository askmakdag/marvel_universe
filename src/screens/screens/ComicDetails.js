import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {portrait} from '../../common/constants';
import _ from 'lodash';
import ComicService from '../../services/api/ComicService';
import HorizontalScrollImages from '../../components/components/HorizontalScrollImages';
import {styles} from '../styles/ComicDetailsStyles';
import AnimatedLoadingComponent from '../../components/components/AnimatedLoadingComponent';
import CacheImageComponent from '../../components/components/CacheImageComponent';
import CharacterListComponent from '../../components/components/listComponents/CharacterListComponent';

class ComicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: {},
      page_loading: false,
      comic_detail_page_url: '',
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {comic} = await this.props.route.params;
    this.props.navigation.setOptions({
      headerTitle: _.toUpper(comic.title),
    });
    await this.getDetailPageUrl(comic);
    await this.setState({page_loading: true});
    const {data} = await this.GetComicDetail({comicId: comic.id});
    await this.setState({comic: data.data.results[0]});
    await this.setState({page_loading: false});
  };

  getDetailPageUrl = async (comic) => {
    const comic_url = await comic.urls.filter((url) => {
      return url.type === 'detail';
    });

    await this.setState({comic_detail_page_url: comic_url[0].url});
  };

  GetComicDetail = async (id) => {
    return await ComicService.getComic(id);
  };

  OpenDetailPage = () => {
    const {comic_detail_page_url} = this.state;
    if (comic_detail_page_url) {
      Linking.openURL(comic_detail_page_url);
    }
  };

  render() {
    const {comic} = this.state;
    return this.state.page_loading ? (
      <AnimatedLoadingComponent />
    ) : (
      <ScrollView style={styles.containerStyle}>
        <View style={styles.topRowStyle}>
          <CacheImageComponent
            uri={`${comic?.thumbnail?.path}/${portrait.uncanny}.${comic?.thumbnail?.extension}`}
            style={styles.imageStyle}
          />
          <View style={styles.comicInfoTopRightStyle}>
            <Text style={styles.comicTitleStyle}>{comic.title}</Text>
            <Text style={styles.comicInfoStyle}>
              {'Pages: ' + comic.pageCount}
            </Text>
            <TouchableOpacity onPress={this.OpenDetailPage}>
              <Text style={styles.linkTextStyle}>
                Navigate To Comic Detail Page
              </Text>
            </TouchableOpacity>
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

        <CharacterListComponent
          comicId={comic?.id}
          navigation={this.props.navigation}
        />
      </ScrollView>
    );
  }
}

export default ComicDetails;
