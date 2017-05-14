import React, { Component } from 'react';
import SnakeLink from './snake-link';
import SnakeHead from './snake-head';
import './snake.css';
import * as direction from '../constants/direction';

class Snake extends Component {
    constructor(props) {
        super(props);

        this.state = {
            head: {
                x: this.props.scale * 2,
                y: this.props.scale * 0,
            },
            speed: 1000 / 2,
            direction: direction.DOWN,
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
        this.setState({ direction: direction.UP });
    }

    moveDown() {
        this.setState({ direction: direction.DOWN });
    }

    moveLeft() {
        this.setState({ direction: direction.LEFT });
    }

    moveRight() {
        this.setState({ direction: direction.RIGHT });
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
            head: {
                x: newX,
                y: newY,
            },
            tail,
        });
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
