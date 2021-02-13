import {StyleSheet} from 'react-native';
import {DEVICE_WIDTH} from '../../common/constants';

export const styles = StyleSheet.create({
  containerStyle: {
    margin: '2%',
  },
  topRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middleColumnStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  characterInfoTopRightStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: DEVICE_WIDTH * 0.6,
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
    width: DEVICE_WIDTH * 0.35,
  },
  characterTitleStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 5,
    paddingTop: 5,
  },
  characterInfoStyle: {
    fontSize: 15,
    marginHorizontal: 7.5,
    paddingTop: 5,
  },
  linkTextStyle: {
    fontSize: 14,
    marginHorizontal: 7.5,
    paddingTop: 5,
    color: 'blue',
  },
  characterDescriptionStyle: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  textStyle: {
    fontSize: 13,
    padding: 5,
  },
});
