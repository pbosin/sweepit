import React, {Component} from 'react';
import { levelSelected } from '../actions/actions';
import { connect } from 'react-redux';

class LevelSelector extends Component {

    constructor (props) {
        super(props);
    }

    selectLevel(level) {
        this.props.dispatch(levelSelected(level));
    }

    render() {
        if (this.props.isLevelSelected) return null;

        return (
            <div className="level-selector">
                <div>Please select your skill level</div>
                <button className="btn btn-sm btn-info" onClick={this.selectLevel.bind(this,1)}>Beginner</button>
                <button className="btn btn-sm btn-info" onClick={this.selectLevel.bind(this,2)}>Intermediate</button>
                <button className="btn btn-sm btn-info" onClick={this.selectLevel.bind(this,3)}>Expert</button>
            </div>
        );
    }
}

export default connect()(LevelSelector);