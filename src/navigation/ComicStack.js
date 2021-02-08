import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Comics from '../../src/screens/Comics';
import {headerScreenOptions} from '../common/constants';
import ComicDetails from '../screens/ComicDetails';

const ComicStack = createStackNavigator();

export default function ComicStackScreen() {
  return (
    <ComicStack.Navigator>
      <ComicStack.Screen
        name="Comics"
        component={Comics}
        options={({navigation, route}) => ({
          title: 'Comics',
          ...headerScreenOptions,
        })}
      />
      <ComicStack.Screen
        component={ComicDetails}
        name="ComicDetails"
        options={({navigation, route}) => ({
          ...headerScreenOptions,
        })}
      />
    </ComicStack.Navigator>
  );
}
