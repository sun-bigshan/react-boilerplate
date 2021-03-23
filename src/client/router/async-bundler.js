import React from 'react';
import LoadingCompoent from './loading-component';

export default class AsyncBundler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mod: null
    };
  }

  componentDidMount() {
    if (!this.state.mod) {
      this.load(this.props);
    }
  }

  load(props) {
    this.setState({
      mod: null
    });
    props.load().then(mod => {
      this.setState({
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : <LoadingCompoent />;
  }
}
