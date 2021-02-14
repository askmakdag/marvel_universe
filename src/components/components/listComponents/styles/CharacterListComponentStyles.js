import {StyleSheet} from 'react-native';
import {DEVICE_WIDTH} from '../../../../common/constants';

export const styles = StyleSheet.create({
  listItemContainerStyle: {
    marginVertical: 5,
  },
  listItemStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerContainerStyle: {
    paddingVertical: 5,
    marginBottom: 5,
    borderBottomWidth: 2,
    borderColor: 'orange',
  },
  headerTextStyle: {
    fontWeight: 'bold',
    color: '#10589f',
  },
  imageStyle: {
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
    width: DEVICE_WIDTH * 0.35,
  },
  titleStyle: {
    fontWeight: 'bold',
    marginLeft: 5,
    flex: 2,
  },
  descriptionStyle: {
    marginTop: 5,
    paddingRight: 5,
    flex: 9,
  },
  descriptionContainerStyle: {
    width: DEVICE_WIDTH * 0.6,
    marginLeft: DEVICE_WIDTH * 0.025,
    height: (DEVICE_WIDTH * 0.35 * 3) / 2,
  },
});
