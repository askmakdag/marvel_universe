import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, ScrollView} from 'react-native';
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
              uri: `${image?.path}/${portrait.uncanny}.${image?.extension}`,
            }}
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
    borderTopWidth: 5,
    borderBottomWidth: 5,
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
    color: '#095096',
  },
});

export default HorizontalScrollImages;
