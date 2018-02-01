import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Game from '../components/Game';

const mapStateToProps = (state) => {
    return {
        game: state.game,
        field: state.field
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        leftClick: (i,j) => {
            dispatch(actions.isFreeClick(i,j))
        },
        rightClick: (i,j) => {
            dispatch(actions.markMineClick(i,j))
        }
    }
};

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);

export default GameContainer;
