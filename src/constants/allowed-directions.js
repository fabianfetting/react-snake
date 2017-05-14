import * as direction from './direction';

export default {
    [direction.UP]: [direction.UP, direction.LEFT, direction.RIGHT],
    [direction.DOWN]: [direction.DOWN, direction.LEFT, direction.RIGHT],
    [direction.LEFT]: [direction.UP, direction.DOWN, direction.LEFT],
    [direction.RIGHT]: [direction.UP, direction.DOWN, direction.RIGHT],
}