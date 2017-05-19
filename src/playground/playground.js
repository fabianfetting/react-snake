import React, { Component } from 'react';
import './playground.css';

class Playground extends Component {
    render() {
        const style = {
            width: this.props.width,
            height: this.props.height,
        };

        const childrenWithProps = React.Children.map(this.props.children, child => {
            if (!child) { return; }
            return React.cloneElement(child, {
                scale: this.props.scale,
            })
        }
        );

        return (
            <div className="playground" style={style}>
                {childrenWithProps}
            </div>
        );
    }
}

Playground.defaultProps = {
    scale: 20,
    width: 15 * 20,
    height: 15 * 20,
};

export default Playground;
