import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import LevelSelector from "./LevelSelector";
import GameResult from "./GameResult";

class ApplicationLayout extends React.Component {
  render(){
      return (
          <div>
            <div className="main-container">
              <Header />
              <LevelSelector isLevelSelected={this.props.isLevelSelected}/>
              {this.props.children}
              <GameResult gameResult={this.props.result}/>
            </div>
          </div>
      );
  }
}

const mapStateToProps = state => {
    return {
        result: state.game.result,
        isLevelSelected: state.game.isLevelSelected
    };
};

export default connect(mapStateToProps)(ApplicationLayout);