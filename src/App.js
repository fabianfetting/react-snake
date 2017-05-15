import React, { Component } from 'react';
import './app.css';
import Snake from './snake/snake';
import Playground from './playground/playground';
import Food from './food/food';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodPosition: { x: 0, y: 1 },
        };
    }

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

    randomPosition() {
        const { scale, height, width } = this.refs.playground.props;
        const maxX = (width - scale) / scale;
        const maxY = (height - scale) / scale;
        return {
            x: Math.floor(Math.random() * (maxX + 1)) * scale,
            y: Math.floor(Math.random() * (maxY + 1)) * scale,
        };
    }

    dropFood() {
        const foodPosition = this.randomPosition();
        this.setState({
            foodPosition,
        });
    }

    componentDidMount() {
        this.refs.app.focus();
        this.dropFood();
    }

    onEat() {
        this.dropFood();
    }

    onDead() {
        console.log('GAME OVER!');

        setTimeout(() => {
            this.dropFood();
            this.refs.snake.reset();
        }, 3000);
    }

    render() {
        return (
            <div ref="app" className="app" onKeyDown={e => this.handleKeyPress(e)} tabIndex="0">
                <Playground ref="playground">
                    <Snake
                        ref="snake"
                        onEat={() => this.onEat()}
                        onDead={() => this.onDead()}
                        foodPosition={this.state.foodPosition}
                    />
                    <Food ref="food" x={this.state.foodPosition.x} y={this.state.foodPosition.y} />
                </Playground>
            </div>
        );
    }
}

export default App;
