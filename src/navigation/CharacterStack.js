import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Characters from '../screens/Characters';
import {headerScreenOptions} from '../common/constants';
import CharacterDetails from '../screens/CharacterDetails';

const CharacterStack = createStackNavigator();

export default function CharacterStackScreen() {
  return (
    <CharacterStack.Navigator>
      <CharacterStack.Screen
        name="Characters"
        component={Characters}
        options={({navigation, route}) => ({
          title: 'Characters',
          ...headerScreenOptions,
        })}
      />
      <CharacterStack.Screen
        component={CharacterDetails}
        name="CharacterDetails"
        options={({navigation, route}) => ({
          ...headerScreenOptions,
        })}
      />
    </CharacterStack.Navigator>
  );
}
