/**
 * Action types
 */
export const NEW_GAME = 'NEW_GAME'; //start over
export const START_GAME = 'START_GAME'; //triggered when user makes 1st click
export const LEVEL_SELECTED = 'LEVEL_SELECTED'; //user selects skill level
export const IS_FREE_CLICK = 'IS_FREE_CLICK'; //left click
export const MARK_MINE_CLICK = 'MARK_MINE_CLICK'; //right click
export const END_GAME = 'END_GAME'; // used for communications between reducers

/**
 * Action creators
 */
export function newGame() {
    return {type: NEW_GAME};
}
export function endGame(result) {
    return {type: END_GAME, result};
}
export function startGame() {
    return {type: START_GAME};
}
export function levelSelected(level) {
    return {type: LEVEL_SELECTED, level};
}
export function isFreeClick(row, col) {
    return {type: IS_FREE_CLICK, row, col};
}
export function markMineClick(row, col) {
    return {type: MARK_MINE_CLICK, row, col};
}
