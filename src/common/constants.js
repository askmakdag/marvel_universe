import {Dimensions} from 'react-native';

export const portrait = {
  small: 'portrait_small', // 50x75px
  medium: 'portrait_medium', // 100x150px
  xlarge: 'portrait_xlarge', // 150x225px
  fantastic: 'portrait_fantastic', // 168x252px
  uncanny: 'portrait_uncanny', // 300x450px
  incredible: 'portrait_incredible', // 216x324px
};

export const standard = {
  small: 'standard_small', // 65x45px
  medium: 'standard_medium', // 100x100px
  large: 'standard_large', // 140x140px
  xlarge: 'standard_xlarge', // 200x200px
  fantastic: 'standard_fantastic', // 250x250px
  amazing: 'standard_amazing', // 180x180px
};

export const landscape = {
  small: 'landscape_small', // 120x90px
  medium: 'landscape_medium', // 175x130px
  large: 'landscape_large', // 190x140px
  xlarge: 'landscape_xlarge', // 270x200px
  amazing: 'landscape_amazing', // 250x156px
  incredible: 'landscape_incredible', //464x261px
};

export const headerScreenOptions = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: 'black',
    borderBottomColor: 'yellow',
    borderBottomWidth: 0,
    elevation: 1,
    shadowOpacity: 1,
  },
  headerTitleStyle: {
    color: 'white',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
};

export const tabBarOptions = {
  activeTintColor: '#C70039',
  inactiveTintColor: 'gray',
  showLabel: true,
  style: {
    backgroundColor: 'black',
  },
  labelStyle: {
    fontWeight: 'bold',
  },
};

export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;
