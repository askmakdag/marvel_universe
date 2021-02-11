import React, {Component} from 'react';
import {View} from 'react-native';
import AnimatedLoadingComponent from '../../components/components/AnimatedLoadingComponent';

class CharacterDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_loading: false,
    };
  }

  UNSAFE_componentWillMount() {
    const {header_title} = this.props.route.params;
    this.props.navigation.setOptions({
      headerTitle: header_title,
    });
  }

  render() {
    return this.state.page_loading ? <AnimatedLoadingComponent /> : <View />;
  }
}

export default CharacterDetails;
