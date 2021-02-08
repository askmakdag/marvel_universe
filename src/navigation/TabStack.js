import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ComicStackScreen from './ComicStack';
import CharacterStackScreen from './CharacterStack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

class TabStack extends Component {
  render = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let type, icon_color, icon_size;

            if (route.name === 'Comics') {
              type = focused ? 'solid' : 'light';
              icon_color = focused ? 'red' : 'blue';
              icon_size = focused ? 24 : 23;
            } else if (route.name === 'Characters') {
              type = focused ? 'solid' : 'light';
              icon_color = focused ? 'red' : 'blue';
              icon_size = focused ? 24 : 23;
            }

            // You can return any component that you like here!
            return (
              <FontAwesomeIcon
                icon={faCoffee}
                color={icon_color}
                type={type}
                size={icon_size}
              />
            );
          },
        })}
        tabBarOptions={{
          inactiveTintColor: 'gray',
          showLabel: false,
        }}>
        <Tab.Screen name="Comics" component={ComicStackScreen} />
        <Tab.Screen name="Characters" component={CharacterStackScreen} />
      </Tab.Navigator>
    );
  };
}

export default TabStack;
