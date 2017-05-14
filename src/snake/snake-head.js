import React, { Component } from 'react';
import SnakeLink from './snake-link';

class SnakeHead extends Component {
  render() {
    return (
      <SnakeLink isHead {...this.props} />
    );
  }
}

export default SnakeHead;
