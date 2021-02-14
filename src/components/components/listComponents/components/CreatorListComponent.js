import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import axios from 'axios';
import {axiosQueryParams} from '../../../../helpers/AxiosHelper';
import {portrait} from '../../../../common/constants';
import CacheImageComponent from '../../CacheImageComponent';
import {styles} from '../styles/CreatorListComponentStyles';

class CreatorListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {collectionURI} = this.props;
    const {data} = await axios.get(`${collectionURI}?${axiosQueryParams}`);
    await this.fillScrollView(data.data.results);
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    if (this.props.images !== nextProps.images) {
      await this.fillScrollView(nextProps.images);
    }
  };

  fillScrollView = async (creators) => {
    let scroll_images = [];

    if (creators) {
      await creators.forEach((creator, index) => {
        scroll_images.push(
          <View key={index} style={styles.itemContainerStyle}>
            <CacheImageComponent
              uri={`${creator?.thumbnail?.path}/${portrait.uncanny}.${creator?.thumbnail?.extension}`}
              style={styles.imageStyle}
            />
            <Text style={styles.creatorTextStyle}>{creator.fullName}</Text>
          </View>,
        );
      });
    }
    await this.setState({images: scroll_images});
  };

  render() {
    const {title} = this.props;
    const {images} = this.state;
    return (
      <View
        display={images.length === 0 ? 'none' : 'flex'}
        style={styles.containerStyle}>
        <View style={styles.titleContainerStyle}>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}>
          {images}
        </ScrollView>
      </View>
    );
  }
}

export default CreatorListComponent;
