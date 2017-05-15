import React, { Component } from 'react';
import SnakeLink from './snake-link';
import SnakeHead from './snake-head';
import './snake.css';
import * as direction from '../constants/direction';
import allowedDirections from '../constants/allowed-directions';

class Snake extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allowedDirections: allowedDirections[direction.RIGHT],
            head: {
                x: this.props.scale * 2,
                y: this.props.scale * 0,
            },
            speed: 1000 / 2,
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
        let speed = this.state.speed;
        let timerId = this.state.timerId;

        let tail = [this.state.head, ...this.state.tail];
        tail.splice(tail.length - 1, 1);

        let newX = x + directionX * this.props.scale;
        let newY = y + directionY * this.props.scale;

        newX = newX > this.state.border.right - this.props.scale ? this.state.border.left : newX;
        newX = newX < this.state.border.left ? this.state.border.right - this.props.scale : newX;

        newY = newY > this.state.border.bottom - this.props.scale ? this.state.border.top : newY;
        newY = newY < this.state.border.top ? this.state.border.bottom - this.props.scale : newY;

        if (this.isOwnPosition(newX, newY)) {
            this.props.onDead();
            this.clearTimer();
            this.setState({
                speed: 0,
            })
            return;
        }

        if (this.isFoodPosition(newX, newY)) {
            tail = [{ x: newX, y: newY }, ...tail];
            speed /= 1.1;
            this.props.onEat();
            timerId = this.refreshTimer(speed, timerId);
        }

        this.setState({
            allowedDirections: allowedDirections[this.state.direction],
            head: {
                x: newX,
                y: newY,
            },
            tail,
            speed,
            timerId,
        });
    }

    isOwnPosition(newX, newY) {
        let body = [this.state.head, ...this.state.tail];
        return !!body.find(link => link.x === newX && link.y === newY);
    }

    refreshTimer(speed, timerId) {
        this.clearTimer();
        return setInterval(() => this.move(), speed);
    }

    clearTimer() {
        clearInterval(this.state.timerId);
    }

    isFoodPosition(x, y) {
        return this.props.foodPosition.x === x && this.props.foodPosition.y === y;
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
        this.clearTimer();
    }
}

export default Snake;
