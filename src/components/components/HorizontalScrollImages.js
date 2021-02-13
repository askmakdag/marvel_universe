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
        <Text style={styles.titleStyle}>{title}</Text>
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
    marginVertical: 20,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'orange',
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.4 * 3) / 2,
    width: DEVICE_WIDTH * 0.4,
    marginRight: 25,
    borderRadius: 10,
    marginVertical: 7.5,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
    color: '#10589f',
  },
});

export default HorizontalScrollImages;
