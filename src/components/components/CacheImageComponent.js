import React from 'react';
import {Image, Platform} from 'react-native';
import shorthash from 'shorthash';

const RNFS = require('react-native-fs');

class CacheImageComponent extends React.Component {
  state = {
    source: {},
    path: '',
  };

  UNSAFE_componentWillMount() {
    const {uri} = this.props;
    this.handleUri(uri);
  }

  handleUri = (uri) => {
    this.CheckIfExists(uri);
  };

  shouldComponentUpdate = async (nextProps, nextState) => {
    const {uri} = this.props;

    if (nextProps.uri !== uri) {
      this.handleUri(nextProps.uri);
    }
  };

  loadFile = (path) => {
    this.setState({source: {uri: path}});
  };

  downloadFile(uri, path) {
    RNFS.downloadFile({fromUrl: uri, toFile: path}).promise.then((res) => {
      this.loadFile(path);
    });
  }

  CheckIfExists = (uri) => {
    const name = shorthash.unique(uri);
    const extension = Platform.OS === 'android' ? 'file://' : '';
    const path = `${extension}${RNFS.CachesDirectoryPath}/${name}.png`;

    RNFS.exists(path).then((exists) => {
      if (exists) {
        this.loadFile(path);
      } else {
        this.downloadFile(uri, path);
      }
    });

    this.setState({path: path});
  };

  render() {
    const {source} = this.state;
    const {style} = this.props;

    return <Image style={style} source={source} />;
  }
}

export default CacheImageComponent;
