import React, { Component } from 'react';
import SnakeLink from './snake-link';
import SnakeHead from './snake-head';
import './snake.css';
import * as direction from '../constants/direction';

const ALLOWED_DIRECTIONS = {
    [direction.UP]: [direction.UP, direction.LEFT, direction.RIGHT],
    [direction.DOWN]: [direction.DOWN, direction.LEFT, direction.RIGHT],
    [direction.LEFT]: [direction.UP, direction.DOWN, direction.LEFT],
    [direction.RIGHT]: [direction.UP, direction.DOWN, direction.RIGHT],
}

class Snake extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allowedDirections: ALLOWED_DIRECTIONS[direction.RIGHT],
            head: {
                x: this.props.scale * 2,
                y: this.props.scale * 0,
            },
            speed: 1000 / 3,
            direction: direction.RIGHT,
            tail: [{ x: this.props.scale * 1, y: 0 }, { x: this.props.scale * 0, y: 0 }],
        };
    }

    componentDidMount() {
        const timerId = setInterval(() => this.move(), this.state.speed);

        this.setState({
            timerId: timerId,
            border: {
                top: this.refs.snake.parentNode.clientTop,
                bottom: this.refs.snake.parentNode.clientTop + this.refs.snake.parentNode.clientHeight,
                left: this.refs.snake.parentNode.clientLeft,
                right: this.refs.snake.parentNode.clientLeft + this.refs.snake.parentNode.clientWidth,
            },
        });
    }

    moveUp() {
        if (this.isMoveAllowed(direction.UP)) {
            this.setState({ direction: direction.UP });
        }
    }

    moveDown() {
        if (this.isMoveAllowed(direction.DOWN)) {
            this.setState({ direction: direction.DOWN });
        }
    }

    moveLeft() {
        if (this.isMoveAllowed(direction.LEFT)) {
            this.setState({ direction: direction.LEFT });
        }
    }

    moveRight() {
        if (this.isMoveAllowed(direction.RIGHT)) {
            this.setState({ direction: direction.RIGHT });
        }
    }

    isMoveAllowed(wantedDirection) {
        return this.state.allowedDirections.indexOf(wantedDirection) >= 0;
    }

    move() {
        const [directionX, directionY] = this.state.direction;
        const { x, y } = this.state.head;

        const tail = [this.state.head, ...this.state.tail];
        tail.splice(tail.length - 1, 1);

        let newX = x + directionX * this.props.scale;
        let newY = y + directionY * this.props.scale;

        newX = newX > this.state.border.right - this.props.scale ? this.state.border.left : newX;
        newX = newX < this.state.border.left ? this.state.border.right - this.props.scale : newX;

        newY = newY > this.state.border.bottom - this.props.scale ? this.state.border.top : newY;
        newY = newY < this.state.border.top ? this.state.border.bottom - this.props.scale : newY;

        this.setState({
            allowedDirections: ALLOWED_DIRECTIONS[this.state.direction],
            head: {
                x: newX,
                y: newY,
            },
            tail,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.head !== this.state.head;
    }

    render() {
        return (
            <div className="snake" ref="snake">
                <SnakeHead x={this.state.head.x} y={this.state.head.y} />
                {this.state.tail.map((link, index) => <SnakeLink key={index} x={link.x} y={link.y} />)}
            </div>
        );
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
    }
}

export default Snake;
