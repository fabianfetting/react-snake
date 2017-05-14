import React, { Component } from 'react';

class SnakeLink extends Component {
  render() {
    const className = this.props.isHead? 'snake-link snake-head' : 'snake-link'
    return (
      <div className={className} style={{ left: this.props.x, top: this.props.y }}></div>
    );
  }
}

export default SnakeLink;
