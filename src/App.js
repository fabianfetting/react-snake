import React, { Component } from 'react';
import './app.css';
import Snake from './snake/snake';
import Playground from './playground/playground';
import Food from './food/food';

class App extends Component {
    handleKeyPress(event) {
        const keyHandler = {
            w: () => this.refs.snake.moveUp(),
            a: () => this.refs.snake.moveLeft(),
            s: () => this.refs.snake.moveDown(),
            d: () => this.refs.snake.moveRight(),
            ArrowUp: () => this.refs.snake.moveUp(),
            ArrowDown: () => this.refs.snake.moveDown(),
            ArrowLeft: () => this.refs.snake.moveLeft(),
            ArrowRight: () => this.refs.snake.moveRight(),
        };

        if (keyHandler[event.key]) {
            keyHandler[event.key]();
        }

    }

    componentDidMount() {
        this.refs.app.focus();
    }

    render() {
        return (
            <div ref="app" className="app" onKeyDown={(e) => this.handleKeyPress(e)} tabIndex="0">
                <Playground>
                    <Snake ref="snake" />
                    <Food ref="food" />
                </Playground>
            </div>
        );
    }
}

export default App;
