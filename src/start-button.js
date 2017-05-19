import React, { Component } from 'react';

class StartButton extends Component {
  onButtonClick(e) {
      this.props.onButtonClick(e);
  }
  render() {
    return (
      <div className="start-button" onClick={(e) => this.onButtonClick(e)}>START</div>
    );
  }
}

export default StartButton;
