import * as actions from '../actions/actions';
import { initField, revealNeighbors, haveNonMineMasked, revealAllMines } from '../helpers/gameHelper';
import * as config from '../helpers/gameConfig';

export const field = (state = {}, action) => {
    const gameConfig = config.gameConfig;

    switch (action.type) {
        case 'ACTION_TYPE': {
            return action.payload;
        }
        case actions.LEVEL_SELECTED: {
            let level = action.level - 1; //zero based
            let rowIndex = gameConfig[level][0];
            let colIndex = gameConfig[level][1];
            let mineCount = gameConfig[level][2];
            let newField = initField(rowIndex, colIndex, mineCount);
            return {rows: newField, clickable: true};
        }
        case actions.IS_FREE_CLICK: {
            let cell = state.rows[action.row][action.col];
            if (!state.clickable || !cell.masked) {
                return state;
            }
            let newField = Object.assign({},state);
            let newCell = newField.rows[action.row][action.col];
            if (cell.mine) {
                newCell.masked = false;
                newField.clickable = false;
                action.asyncDispatch(actions.endGame('lost'));
            } else {
                newCell.masked = false;
                action.asyncDispatch(actions.startGame());
                if (cell.count === 0) {
                    // reveal surrounding cells recursively for each opened zero
                    let rowCont = newField.rows.length;
                    let colCount = newField.rows[0].length;
                    revealNeighbors(newField.rows, rowCont, colCount, [{r:action.row, c:action.col}]);
                }
                if (!haveNonMineMasked(newField.rows)) {
                    newField.clickable = false;
                    newField.rows = revealAllMines(newField.rows);
                    action.asyncDispatch(actions.endGame('won'));
                }
            }
            return newField;
        }
        case actions.MARK_MINE_CLICK: {
            let cell = state.rows[action.row][action.col];
            if (!state.clickable || !cell.masked) {
                return state;
            }
            let newField = Object.assign({},state);
            let newCell = newField.rows[action.row][action.col];
            newCell.marked = true;
            return newField;
        }
        default: {
            return state;
        }
    }
};