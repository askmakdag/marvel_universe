import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {DEVICE_WIDTH, portrait} from '../../common/constants';
import CacheImageComponent from './CacheImageComponent';

class HorizontalScrollImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  UNSAFE_componentWillMount = async () => {
    await this.fillScrollView(this.props.images);
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    if (this.props.images !== nextProps.images) {
      await this.fillScrollView(nextProps.images);
    }
  };

  fillScrollView = async (images) => {
    let scroll_images = [];

    if (images) {
      await images.forEach((image, index) => {
        scroll_images.push(
          <CacheImageComponent
            key={index}
            uri={`${image?.path}/${portrait.uncanny}.${image?.extension}`}
            style={styles.imageStyle}
          />,
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

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
    width: DEVICE_WIDTH * 0.35,
    marginRight: 25,
    borderRadius: 10,
    marginVertical: 7.5,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#10589f',
  },
  titleContainerStyle: {
    borderColor: 'orange',
    borderBottomWidth: 2,
    paddingVertical: 5,
  },
});

export default HorizontalScrollImages;
