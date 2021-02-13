import React, {Component} from 'react';
import {View} from 'react-native';
import AnimatedLoadingComponent from '../../components/components/AnimatedLoadingComponent';
import _ from 'lodash';

class CharacterDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_loading: false,
    };
  }

  UNSAFE_componentWillMount() {
    const {character} = this.props.route.params;
    this.props.navigation.setOptions({
      headerTitle: _.toUpper(character.name),
    });
  }

  render() {
    return this.state.page_loading ? <AnimatedLoadingComponent /> : <View />;
  }
}

export default CharacterDetails;
