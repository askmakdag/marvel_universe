import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Comics from '../screens/screens/Comics';
import {headerScreenOptions} from '../common/constants';
import ComicDetails from '../screens/screens/ComicDetails';
import CharacterDetails from '../screens/screens/CharacterDetails';

const ComicStack = createStackNavigator();

export default function ComicStackScreen() {
  return (
    <ComicStack.Navigator>
      <ComicStack.Screen
        name="Comics"
        component={Comics}
        options={({navigation, route}) => ({
          title: 'MARVEL FEATURED',
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
      <ComicStack.Screen
        component={CharacterDetails}
        name="CharacterDetails"
        options={({navigation, route}) => ({
          ...headerScreenOptions,
        })}
      />
    </ComicStack.Navigator>
  );
}
