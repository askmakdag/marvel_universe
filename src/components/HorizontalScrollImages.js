import React, {Component} from 'react';
import {Image, StyleSheet, ScrollView} from 'react-native';
import {DEVICE_WIDTH, portrait} from '../common/constants';

class HorizontalScrollImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  shouldComponentUpdate = async (nextProps, nextState) => {
    if (this.props.images !== nextProps.images) {
      await this.fillScrollView(nextProps.images);
    }
  };

  fillScrollView = async (images) => {
    let scroll_images = [];

    if (images) {
      await images.forEach((image) => {
        scroll_images.push(
          <Image
            style={styles.imageStyle}
            source={{
              uri: `${image.path}/${portrait.uncanny}.${image.extension}`,
            }}
          />,
        );
      });
    }
    await this.setState({images: scroll_images});
  };

  render() {
    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}>
        {this.state.images}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    height: (DEVICE_WIDTH * 0.4 * 3) / 2,
    width: DEVICE_WIDTH * 0.4,
    marginRight: 25,
    marginVertical: 20,
    borderRadius: 10,
  },
});

export default HorizontalScrollImages;
