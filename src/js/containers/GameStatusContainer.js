import React from 'react';
import { connect } from 'react-redux';
import { GameStatus } from '../components/GameStatus';

const mapStateToProps = (state) => {
  return {
    rowsLength: state.field.rows.length,
    level: state.game.level,
    minesLeft: state.game.mineCount,
    isFinished: state.game.isFinished,
    isStarted: state.game.isStarted
  }
};

const GameStatusContainer = connect(mapStateToProps)(GameStatus);

export default GameStatusContainer;