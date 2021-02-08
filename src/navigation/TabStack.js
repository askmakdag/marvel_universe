import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  faStar,
  faBookReader,
  faBookDead,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';
import {tabBarOptions} from '../common/constants';
import ComicStackScreen from './ComicStack';
import CharacterStackScreen from './CharacterStack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Tab = createBottomTabNavigator();

class TabStack extends Component {
  render = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let type, icon_color, icon_size, icon;

            if (route.name === 'COMICS') {
              icon = faBookDead;
              type = focused ? 'solid' : 'light';
              icon_color = focused ? '#C70039' : 'gray';
              icon_size = focused ? 24 : 23;
            } else if (route.name === 'CHARACTERS') {
              icon = faStar;
              type = focused ? 'solid' : 'light';
              icon_color = focused ? '#C70039' : 'gray';
              icon_size = focused ? 24 : 23;
            }

            // You can return any component that you like here!
            return (
              <FontAwesomeIcon
                icon={icon}
                color={icon_color}
                type={type}
                size={icon_size}
              />
            );
          },
        })}
        tabBarOptions={tabBarOptions}>
        <Tab.Screen name="COMICS" component={ComicStackScreen} />
        <Tab.Screen name="CHARACTERS" component={CharacterStackScreen} />
      </Tab.Navigator>
    );
  };
}

export default TabStack;
