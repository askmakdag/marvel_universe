import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerStyleIos: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'center',
  },
  inputContainerStyleAndroid: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'center',
    width: '96%',
    borderRadius: 7.5,
  },
  inputStyle: {
    height: 20,
    backgroundColor: '#cacaca',
  },
  inputTextStyle: {
    fontSize: 15,
    height: 35,
  },
});
