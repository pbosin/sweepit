import * as actions from '../actions/actions';
import * as config from '../helpers/gameConfig';

export const game = (state = {}, action) => {

  const gameConfig = config.gameConfig;

  // process actions
  switch(action.type) {
    case 'ACTION_TYPE': {
      return action.payload;
    }
    case actions.NEW_GAME: {
      let newGame = {
        isLevelSelected: false,
        isStarted: false,
        isFinished: false,
        result: ''
      };
      return Object.assign({}, state, newGame);
    }
    case actions.LEVEL_SELECTED: {
      let level = action.level - 1; //zero based
      let newGame = {
        isLevelSelected: true,
        level: level,
        rowCount: gameConfig[level][0],
        colCount: gameConfig[level][1],
        mineCount: gameConfig[level][2],
        isStarted: false,
        isFinished: false,
        result: ''
      };
      return Object.assign({}, state, newGame);
    }
    case actions.START_GAME: {
      return Object.assign({}, state, {isStarted: true});
    }
    case actions.END_GAME: {
      return Object.assign({}, state, {
        isFinished: true,
        result: action.result
      })
    }
    case actions.MARK_MINE_CLICK: {
      if (!state.isFinished) {
        return Object.assign({},state, {
          mineCount: state.mineCount - 1
        });
      }
    }
    default: {
      return state;
    }
  }
};
