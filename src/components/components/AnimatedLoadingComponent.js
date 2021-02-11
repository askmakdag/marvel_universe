import React from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../common/constants';

export default class AnimatedLoadingComponent extends React.Component {
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: DEVICE_HEIGHT,
          width: DEVICE_WIDTH,
          backgroundColor: 'black',
        }}>
        <LottieView
          source={require('./../../assets/loading_lottie.json')}
          autoPlay
          loop
          style={{height: 100, width: 100}}
        />
      </View>
    );
  }
}
