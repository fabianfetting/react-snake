import React, { Component } from 'react';
import './food.css';

class Food extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
        width: this.props.scale,
        height: this.props.scale,
        left: this.props.x,
        top: this.props.y,
    };

    return (
      <div className="food" style={style}></div>
    );
  }
}

export default Food;
