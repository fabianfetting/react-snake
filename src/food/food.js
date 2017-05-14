import React, { Component } from 'react';
import './food.css';

class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.scale * 5,
      y: this.props.scale * 8,
    };
  }

  render() {
    const style = {
        width: this.props.scale,
        height: this.props.scale,
        left: this.state.x,
        top: this.state.y,
    };

    return (
      <div className="food" style={style}></div>
    );
  }
}

export default Food;
